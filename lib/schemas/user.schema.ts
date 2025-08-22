import { ERRORS } from "@/lib/constants/errors";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/constants/regex";
import { z } from "zod";

const MAX_FILE_SIZE = 50_000_00;
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
    .min(2, {
      message: ERRORS.USER.USERNAME_LENGTH,
    })
    .max(30, {
      message: ERRORS.USER.USERNAME_LENGTH,
    }),
  avatarUrl: z.string().url().nullable(),
  email: z.string().regex(EMAIL_REGEX, ERRORS.USER.EMAIL_FORMAT),
  password: z.string().regex(PASSWORD_REGEX, ERRORS.USER.PASSWORD_COMPLEXITY),
});

export const signUpUserSchema = userSchema
  .omit({
    id: true,
    username: true,
    avatarUrl: true,
  })
  .extend({
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: ERRORS.USER.PASSWORDS_MISMATCH,
  });

export const signInUserSchema = userSchema.omit({
  id: true,
  username: true,
  avatarUrl: true,
});

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: ERRORS.USER.USERNAME_LENGTH,
      })
      .max(30, {
        message: ERRORS.USER.USERNAME_LENGTH,
      }),
    image: z
      .custom<File>()
      .refine((file) => file?.name.length > 0, ERRORS.FILE.REQUIRED)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        ERRORS.FILE.TYPE,
      )
      .refine((file) => file?.size <= MAX_FILE_SIZE, ERRORS.FILE.SIZE),
    currentPassword: z
      .string()
      .min(1, { message: ERRORS.GENERAL.FIELD_REQUIRED }),
    newPassword: z
      .union([
        z.string().regex(PASSWORD_REGEX, ERRORS.USER.PASSWORD_COMPLEXITY),
        z.literal(""),
      ])
      .optional(),
    confirm: z.union([z.string(), z.literal("")]).optional(),
  })
  .superRefine((data, ctx) => {
    const hasNewPassword = !!data.newPassword && data.newPassword !== "";
    const hasConfirm = !!data.confirm && data.confirm !== "";

    if (hasNewPassword || hasConfirm) {
      if (!hasNewPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERRORS.GENERAL.FIELD_REQUIRED,
          path: ["newPassword"],
        });
      }

      if (!hasConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERRORS.GENERAL.FIELD_REQUIRED,
          path: ["confirm"],
        });
      }

      if (hasNewPassword && hasConfirm && data.newPassword !== data.confirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERRORS.USER.PASSWORDS_MISMATCH,
          path: ["confirm"],
        });
      }
    }
  });
