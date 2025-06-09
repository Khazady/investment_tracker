import { Typography } from "@/components/ui/Typography/Typography";
import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useId } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Text for the input label; if omitted, renders only the input */
  label?: string;
  /** Error message to display below the field */
  error?: string;
  /** Hint text to display when there's no error */
  hint?: string;
  /** Layout label and input inline when true */
  inline?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, hint, inline = false, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const inputElement = (
      <input
        id={inputId}
        ref={ref}
        className={cn(styles.input, error && styles.error, className)}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
    );

    const helpText = error ? (
      <Typography
        id={`${inputId}-error`}
        role="alert"
        variant="caption"
        color="error"
        className={styles.errorMessage}
      >
        {error}
      </Typography>
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

Input.displayName = "Input";
