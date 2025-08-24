import { S3Client } from "@aws-sdk/client-s3";

const STORAGE_ENDPOINT = process.env.STORAGE_ENDPOINT?.replace(/\/+$/, "");
export const STORAGE_BUCKET = process.env.STORAGE_BUCKET as string;
export const STORAGE_PUBLIC_URL = (
  process.env.STORAGE_PUBLIC_URL || ""
).replace(/\/+$/, "");

export const s3Client = new S3Client({
  endpoint: STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY as string,
  },
});
