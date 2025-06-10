import Typography, {
  type TypographyColor,
} from "@/components/ui/Typography/Typography";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import styles from "./ErrorMessage.module.css";

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** The error message to display */
  message: string;
  /** Optional ID for the error message element */
  id?: string;
  /** Color variant for the error message */
  color?: TypographyColor;
}

const ErrorMessage = ({
  message,
  id,
  className,
  color = "error",
  ...props
}: ErrorMessageProps) => {
  return (
    <Typography
      id={id}
      role="alert"
      variant="caption"
      color={color}
      className={cn(styles.errorMessage, className)}
      {...props}
    >
      {message}
    </Typography>
  );
};

export default ErrorMessage;
