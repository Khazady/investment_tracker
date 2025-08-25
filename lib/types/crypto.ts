export interface CryptoAssetDTO {
  id: string;
  symbol: string;
  name: string;
  logoUrl: string;
  priceUsd: number;
  marketCapUsd: number;
  sector: string | null;
}

export interface CryptoService {
  getAsset(slug: string): Promise<CryptoAssetDTO | null>;
}
