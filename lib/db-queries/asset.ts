import { ERRORS } from "@/lib/constants/errors";
import Asset, { type IAsset } from "@/models/Asset";

export async function getAssetBySlug(slug: string) {
  try {
    return await Asset.findOne({ slug });
  } catch (error) {
    console.error("Failed to fetch asset:", error);
    throw new Error(ERRORS.GENERAL.DATABASE);
  }
}

export async function saveAsset(data: IAsset) {
  try {
    const newAsset = new Asset(data);
    await newAsset.save();
  } catch (error) {
    console.error("Failed to upsert asset:", error);
    throw new Error(ERRORS.GENERAL.DATABASE);
  }
}
