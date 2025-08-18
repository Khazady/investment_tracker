import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/constants/regex";
import { z } from "zod";

const MAX_FILE_SIZE = 50_000_00;
const ACCEPTED_IMAGE_TYPES = [
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
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  image: z
    .custom<File>()
    .refine((file) => file?.name.length > 0, "File is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Must be a JPG, PNG, or WEBP image.",
    )
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
  email: z.string().regex(EMAIL_REGEX, "Email format is incorrect."),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).",
    ),
});

export const signUpUserSchema = userSchema
  .omit({
    id: true,
    username: true,
    image: true,
  })
  .extend({
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match.",
  });

export const signInUserSchema = userSchema.omit({
  id: true,
  username: true,
  image: true,
});

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required." }),
    newPassword: z
      .union([
        z
          .string()
          .regex(
            PASSWORD_REGEX,
            "The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).",
          ),
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
          message: "New password is required.",
          path: ["newPassword"],
        });
      }

      if (!hasConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Confirm password is required.",
          path: ["confirm"],
        });
      }

      if (hasNewPassword && hasConfirm && data.newPassword !== data.confirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match.",
          path: ["confirm"],
        });
      }
    }
  });
