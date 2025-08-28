import { getAssetBySlug, saveAsset } from "@/lib/db-queries/asset";
import { connectDB } from "@/lib/mongodb";
import { ApiSourceEnum } from "@/lib/types/app";
import { omit } from "@/lib/utils/object";
import { AssetTypeEnum } from "@/models/Asset";
import type { CryptoAssetDTO, CryptoClient } from "./types/crypto";

const CRYPTO_MARKET_API_URL = process.env.CRYPTO_MARKET_API_URL as string;
const CRYPTO_MARKET_API_KEY = process.env.CRYPTO_MARKET_API_KEY as string;

async function fetchCoinSnapshot(
  id: string,
): Promise<Omit<CryptoAssetDTO, "createdAt" | "updatedAt"> | null> {
  const url =
    `${CRYPTO_MARKET_API_URL}/coins/markets` +
    `?vs_currency=usd&ids=${encodeURIComponent(id)}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { "x-cg-demo-api-key": CRYPTO_MARKET_API_KEY },
    });

    if (!res.ok) return null;

    const [data]: Array<{
      id: string;
      symbol: string;
      name: string;
      image?: string;
      current_price?: number;
      market_cap?: number;
    }> = await res.json();

    return {
      type: AssetTypeEnum.crypto,
      symbol: data.symbol,
      slug: data.id,
      name: data.name,
      apiSource: ApiSourceEnum.crypto_market,
      metadata: {
        coingeckoId: data.id,
        logoUrl: data.image ?? null,
      },
      priceUsd: data.current_price ?? null,
      marketCapUsd: data.market_cap ?? null,
    };
  } catch (error) {
    console.error("Failed to fetch coin snapshot", error);
    return null;
  }
}

async function fetchCoinPrice(
  id: string,
): Promise<Pick<CryptoAssetDTO, "priceUsd" | "marketCapUsd"> | null> {
  try {
    const url = `${CRYPTO_MARKET_API_URL}/simple/price?vs_currencies=${encodeURIComponent(id)}`;

    const res = await fetch(url, {
      next: { revalidate: 15 },
      headers: { "x-cg-demo-api-key": CRYPTO_MARKET_API_KEY },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      priceUsd: data[id].usd,
      marketCapUsd: data[id].usd_market_cap,
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
    if (!asset) {
      const dto = await fetchCoinSnapshot(slug);
      if (!dto) return null;

      const rest = omit(dto, ["priceUsd", "marketCapUsd"]);

      saveAsset(rest);
      return dto;
    }

    const price = await fetchCoinPrice(asset.metadata.coingeckoId);

    if (!price) return null;

    return {
      ...(typeof asset.toObject === "function" ? asset.toObject() : asset),
      ...price,
    };
  }
}

const cryptoClient: CryptoClient = new CryptoMarketDataClient();

export function getCryptoAsset(slug: string) {
  return cryptoClient.getAsset(slug);
}
