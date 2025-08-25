import Image from "@/components/ui/Image/Image";
import Typography from "@/components/ui/Typography/Typography";
import { useDictionary } from "@/lib/hooks/useDictionary";
import type { CryptoAssetDTO } from "@/lib/types/crypto";
import styles from "./AssetCard.module.css";

interface AssetCardProps {
  asset: CryptoAssetDTO;
}

export default function AssetCard({ asset }: AssetCardProps) {
  const dict = useDictionary();

  return (
    <div className={styles.card}>
      {asset.logoUrl && (
        <Image src={asset.logoUrl} alt={asset.name} size={64} />
      )}
      <Typography variant="h2">{asset.name}</Typography>
      <Typography color="muted" variant="caption">
        {asset.symbol.toUpperCase()}
      </Typography>
      <Typography variant="body">
        {dict.asset.price}: ${asset.priceUsd.toLocaleString()}
      </Typography>
      <Typography variant="body">
        {dict.asset.marketCap}: ${asset.marketCapUsd.toLocaleString()}
      </Typography>
      {asset.sector && (
        <Typography variant="body">
          {dict.asset.sector}: {asset.sector}
        </Typography>
      )}
    </div>
  );
}
