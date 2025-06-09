import { cn } from "@/lib/utils";
import {
  ElementType,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  JSX,
} from "react";
import styles from "./Typography.module.css";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "caption"
  | "label"
  | "code";

const variantTagMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  caption: "span",
  label: "span",
  code: "code",
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    { variant = "body", className, children, ...props },
    ref,
  ) {
    const Tag = variantTagMap[variant] as ElementType;
    return (
      <Tag
        ref={ref as ForwardedRef<HTMLSpanElement>}
        className={cn(styles[variant], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Typography.displayName = "Typography";
