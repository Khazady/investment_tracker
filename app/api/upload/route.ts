import { s3Client, STORAGE_BUCKET, STORAGE_PUBLIC_URL } from "@/lib/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileKey = `${randomUUID()}-${file.name}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: STORAGE_BUCKET,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  const url = `${STORAGE_PUBLIC_URL}/${fileKey}`;

  return NextResponse.json({ url });
}
