import { getAssetBySlug, saveAsset } from "@/lib/db-queries/asset";
import { connectDB } from "@/lib/mongodb";
import { ApiSourceEnum } from "@/lib/types/app";
import { AssetTypeEnum } from "@/models/Asset";
import type { CryptoAssetDTO, CryptoClient } from "./types/crypto";

const CRYPTO_MARKET_API_URL = process.env.CRYPTO_MARKET_API_URL as string;
const CRYPTO_MARKET_API_KEY = process.env.CRYPTO_MARKET_API_KEY as string;
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

async function fetchCoinData(id: string): Promise<CryptoAssetDTO | null> {
  try {
    const res = await fetch(`${CRYPTO_MARKET_API_URL}/coins/${id}`, {
      next: { revalidate: 60 },
      headers: { "x-cg-demo-api-key": CRYPTO_MARKET_API_KEY },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return {
      type: AssetTypeEnum.crypto,
      symbol: data.symbol,
      slug: data.web_slug,
      name: data.name,
      apiSource: ApiSourceEnum.crypto_market,
      metadata: {
        coingeckoId: data.id,
        contractAddress: data.detail_platforms?.contract_address,
        logoUrl: data.image?.small || null,
      },
      priceUsd: data.market_data?.current_price?.usd ?? null,
      marketCapUsd: data.market_data?.market_cap?.usd ?? null,
    };
  } catch (error) {
    console.error("Failed to fetch asset from CoinGecko", error);
    return null;
  }
}

async function fetchCoinPrice(
  id: string,
  contractAddress: string,
): Promise<Pick<CryptoAssetDTO, "priceUsd" | "marketCapUsd"> | null> {
  try {
    const res = await fetch(
      `${CRYPTO_MARKET_API_URL}/simple/token_price/${id}?contract_addresses${contractAddress}&vs_currencies=usd`,
      {
        next: { revalidate: 15 },
        headers: { "x-cg-demo-api-key": CRYPTO_MARKET_API_KEY },
      },
    );

    if (!res.ok) return null;
    const data = await res.json();
    return {
      priceUsd: data[contractAddress].usd,
      marketCapUsd: data[contractAddress].usd_market_cap,
    };
  } catch (error) {
    console.error("Failed to fetch price of asset from CoinGecko", error);
    return null;
  }
}

class CryptoMarketDataClient implements CryptoClient {
  async getAsset(slug: string): Promise<CryptoAssetDTO | null> {
    await connectDB();
    const asset = await getAssetBySlug(slug);
    const now = Date.now();
    const isSaved = !!asset;
    const isStale = asset && now - asset.updatedAt.getTime() > CACHE_TTL_MS;

    console.log(isSaved, isStale);
    if (!isSaved) {
      const dto = await fetchCoinData(slug);
      if (!dto) return null;

      const { priceUsd, marketCapUsd, ...rest } = dto;
      saveAsset(rest);
      return dto;
    }
    if (isStale) {
      const price = await fetchCoinPrice(slug, asset.metadata.contractAddress);
      return { ...asset, ...price };
    }

    return null;
  }
}

const cryptoClient: CryptoClient = new CryptoMarketDataClient();

export function getCryptoAsset(slug: string) {
  return cryptoClient.getAsset(slug);
}
