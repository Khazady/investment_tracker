"use client";

import Image from "@/components/ui/Image/Image";
import type { InputProps } from "@/components/ui/Input/Input";
import Input from "@/components/ui/Input/Input";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/schemas/user.schema";
import { useState } from "react";

interface AvatarUploadProps extends InputProps {
  /** Existing avatar URL to display */
  initialUrl?: string | null;
}

export default function AvatarUpload({
  initialUrl,
  label,
  disabled = false,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div>
      {preview && (
        <Image
          src={preview}
          alt={label || "avatar"}
          size={64}
          priority={false}
        />
      )}
      <Input
        type="file"
        name="image"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        label={label}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
