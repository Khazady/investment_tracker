import AssetCard from "@/components/assets/AssetCard";
import Typography from "@/components/ui/Typography/Typography";
import { getCryptoAsset } from "@/lib/crypto";
import { getDictionary } from "@/lib/dictionaries/server";
import type { SlugPageProps } from "@/lib/types/app";

export default async function AssetPage({ params }: SlugPageProps) {
  const dict = await getDictionary(params);
  const { slug } = await params;

  const asset = await getCryptoAsset(slug);

  if (!asset) {
    return <Typography variant="body">{dict.asset.assetNotFound}</Typography>;
  }

  return <AssetCard asset={asset} />;
}
