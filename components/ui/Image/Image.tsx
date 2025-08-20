import { cn } from "@/lib/utils/cn";
import NextImage, { type ImageProps } from "next/image";
import styles from "./Image.module.css";

interface UiImageProps extends Omit<ImageProps, "width" | "height"> {
  size?: number;
  shape?: "circle" | "square";
}

export default function Image({
  size = 64,
  shape = "circle",
  className,
  alt = "",
  ...props
}: UiImageProps) {
  return (
    <NextImage
      width={size}
      height={size}
      alt={alt}
      className={cn(
        styles.image,
        shape === "circle" ? styles.circle : styles.square,
        className,
      )}
      {...props}
    />
  );
}
