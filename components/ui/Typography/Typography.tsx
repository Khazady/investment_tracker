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

export type TypographyColor =
  | "foreground"
  | "primary"
  | "muted"
  | "error"
  | "inherit";

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
  color?: TypographyColor;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    { variant = "body", color = "foreground", className, children, ...props },
    ref,
  ) {
    const Tag = variantTagMap[variant] as ElementType;
    return (
      <Tag
        ref={ref as ForwardedRef<HTMLSpanElement>}
        className={cn(styles[variant], styles[`color-${color}`], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Typography.displayName = "Typography";
