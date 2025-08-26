import type { IAsset } from "@/models/Asset";

export interface CryptoAssetDTO extends IAsset {
  priceUsd: number | null;
  marketCapUsd: number | null;
}

export interface CryptoClient {
  getAsset(slug: string): Promise<CryptoAssetDTO | null>;
}
