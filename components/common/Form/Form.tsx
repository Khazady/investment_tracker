"use client";

import type { FormHTMLAttributes, ReactNode } from "react";
import styles from "@/styles/Form.module.css";
import { cn } from "@/lib/utils/cn";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn(styles.form, className)} {...props}>
      {children}
    </form>
  );
}

