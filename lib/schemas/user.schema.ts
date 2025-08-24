import { ERRORS } from "@/lib/constants/errors";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/constants/regex";
import { z } from "zod";

// 5 MB
const MAX_FILE_SIZE = 5_000_000;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const userSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .trim()
    .min(2, { message: ERRORS.USER.USERNAME_LENGTH })
    .max(30, { message: ERRORS.USER.USERNAME_LENGTH }),
  avatarUrl: z.string().url().nullable(),
  email: z.string().trim().regex(EMAIL_REGEX, ERRORS.USER.EMAIL_FORMAT),
  password: z.string().regex(PASSWORD_REGEX, ERRORS.USER.PASSWORD_COMPLEXITY),
});

const passwordsMatch = ({
  password,
  confirm,
}: {
  password: string;
  confirm: string;
}) => password === confirm;

export const signUpUserSchema = z
  .object({
    email: userSchema.shape.email,
    password: userSchema.shape.password,
    confirm: z.string(),
  })
  .refine(passwordsMatch, {
    path: ["confirm"],
    message: ERRORS.USER.PASSWORDS_MISMATCH,
  });

export const signInUserSchema = z.object({
  email: userSchema.shape.email,
  password: z.string().min(1, { message: ERRORS.GENERAL.FIELD_REQUIRED }),
});

export const updateProfileSchema = z.object({
  username: userSchema.shape.username,
});

export const updatePasswordSchema = z
  .object({
    password: userSchema.shape.password,
    confirm: z.string(),
  })
  .extend({
    currentPassword: z
      .string()
      .min(1, { message: ERRORS.GENERAL.FIELD_REQUIRED }),
  })
  .refine(passwordsMatch, {
    path: ["confirm"],
    message: ERRORS.USER.PASSWORDS_MISMATCH,
  });
