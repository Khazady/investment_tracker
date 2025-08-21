import { S3Client } from "@aws-sdk/client-s3";

const STORAGE_ENDPOINT = process.env.STORAGE_ENDPOINT?.replace(/\/+$/, "");
export const STORAGE_BUCKET = process.env.STORAGE_BUCKET as string;
export const STORAGE_PUBLIC_URL = (
  process.env.STORAGE_PUBLIC_URL || ""
).replace(/\/+$/, "");
const STORAGE_REGION = process.env.STORAGE_REGION || "eu-central-1";

export const s3Client = new S3Client({
  region: STORAGE_REGION,
  endpoint: STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY as string,
  },
});
