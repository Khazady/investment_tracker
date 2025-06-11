import { hashPassword, verifyPassword } from "@/lib/utils";
import type {
  CallbackWithoutResultAndOptionalError,
  Document,
  Model,
} from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
  publicSlug: string;
  bio?: string | null;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^.+@.+\..+$/,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    publicSlug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  {
    versionKey: false,
  },
);

// Hash password before saving
UserSchema.pre<IUser>(
  "save",
  async function (this: IUser, next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("passwordHash")) return next();
    try {
      this.passwordHash = await hashPassword(this.passwordHash);
      next();
    } catch (err) {
      next(err as Error);
    }
  },
);

// Instance method to compare passwords
UserSchema.methods.comparePassword = function (this: IUser, candidate: string) {
  return verifyPassword(this.passwordHash, candidate);
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
