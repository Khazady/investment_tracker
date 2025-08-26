import Image from "@/components/ui/Image/Image";
import Typography from "@/components/ui/Typography/Typography";
import type { Dictionary } from "@/lib/types/app";
import type { CryptoAssetDTO } from "@/lib/types/crypto";
import styles from "./AssetCard.module.css";

interface AssetCardProps {
  asset: CryptoAssetDTO;
  dict: Dictionary;
}

export default function AssetCard({ asset, dict }: AssetCardProps) {
  return (
    <div className={styles.card}>
      {asset.metadata.logoUrl && (
        <Image src={asset.metadata.logoUrl} alt={asset.name} size={64} />
      )}
      <Typography variant="h2">{asset.type}</Typography>
      <Typography variant="h2">{asset.name}</Typography>
      <Typography color="muted" variant="caption">
        {asset.symbol.toUpperCase()}
      </Typography>
      <Typography variant="body">
        {dict.asset.price}: ${asset.priceUsd?.toLocaleString()}
      </Typography>
      <Typography variant="body">
        {dict.asset.marketCap}: ${asset.marketCapUsd?.toLocaleString()}
      </Typography>
    </div>
  );
}
