import { ApiSourceEnum } from "@/lib/types/app";
import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface AssetMetadata {
  coingeckoId: string;
  image: {
    small: string | null;
  };
}
enum AssetTypeEnum {
  crypto = "crypto",
}
export interface IAsset extends Document {
  type: AssetTypeEnum;
  symbol: string;
  name: string;
  slug: string;
  apiSource: ApiSourceEnum;
  metadata: AssetMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>(
  {
    type: { type: String, enum: Object.values(AssetTypeEnum), required: true },
    symbol: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    apiSource: {
      type: String,
      enum: Object.values(ApiSourceEnum),
      required: true,
    },
    metadata: {
      coingeckoId: { type: String, required: true },
      logoUrl: { type: String, default: null },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },
);

const Asset: Model<IAsset> =
  mongoose.models.Asset || mongoose.model<IAsset>("Asset", AssetSchema);

export default Asset;
