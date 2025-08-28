"use client";

import { cn } from "@/lib/utils/dom";
import styles from "@/styles/Form.module.css";
import type { FormHTMLAttributes, ReactNode } from "react";

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
