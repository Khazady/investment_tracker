"use server";

import { ERRORS } from "@/lib/constants/errors";
import { ROUTES } from "@/lib/constants/routes";
import { updateProfileSchema } from "@/lib/schemas/user.schema";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { s3Client, STORAGE_BUCKET, STORAGE_PUBLIC_URL } from "../s3";
import { getCurrentUser } from "../server/getCurrentUser";

export interface IUpdateProfileForm {
  error?: string;
  message?: string;
  fieldErrors?: {
    username?: string[];
    image?: string[];
  };
}

export async function updateProfile(
  _prevState: IUpdateProfileForm,
  formData: FormData,
): Promise<IUpdateProfileForm> {
  const validatedFields = updateProfileSchema.safeParse({
    username: formData.get("username"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: ERRORS.GENERAL.INVALID_DATA,
    };
  }

  const { username, image } = validatedFields.data;

  const user = await getCurrentUser();

  if (!user) {
    return { error: ERRORS.AUTH.NOT_AUTHENTICATED };
  }

  try {
    user.username = username;

    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileKey = `${randomUUID()}-${image.name}`;
      await s3Client.send(
        new PutObjectCommand({
          Bucket: STORAGE_BUCKET,
          Key: fileKey,
          Body: buffer,
          ContentType: image.type,
        }),
      );
      user.avatarUrl = `${STORAGE_PUBLIC_URL}/${fileKey}`;
    }

    await user.save();
  } catch (error) {
    console.error(error);
    return { message: ERRORS.GENERAL.DATABASE };
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "";
  const path = locale ? `/${locale}${ROUTES.PROFILE}` : ROUTES.PROFILE;
  revalidatePath(path);

  return { message: "Profile updated." };
}
