"use client";

import { Errors } from "@/components/ui/ErrorMessage/ErrorMessage";
import Typography from "@/components/ui/Typography/Typography";

import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";
import { forwardRef, useId } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Text for the input label; if omitted, renders only the input */
  label?: string;
  /** Error message to display below the field */
  errors?: string | string[];
  /** Hint text to display when there's no error */
  hint?: string;
  /** Layout label and input inline when true */
  inline?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, errors, hint, inline = false, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const inputElement = (
      <input
        id={inputId}
        ref={ref}
        className={cn(styles.input, errors && styles.error, className)}
        aria-invalid={!!errors}
        aria-describedby={
          errors ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
    );

    const helpText = errors ? (
      <Errors id={`${inputId}-error`} errors={errors} />
    ) : hint ? (
      <Typography
        id={`${inputId}-hint`}
        variant="caption"
        color="muted"
        className={styles.hint}
      >
        {hint}
      </Typography>
    ) : null;

    if (label) {
      return (
        <label
          htmlFor={inputId}
          className={cn(styles.label, inline && styles.labelInline)}
        >
          <Typography variant="label" className={styles.labelText}>
            {label}
          </Typography>
          {inputElement}
          {helpText}
        </label>
      );
    }

    return (
      <div className={styles.wrapper}>
        {inputElement}
        {helpText}
      </div>
    );
  },
);

export default Input;

Input.displayName = "Input";
