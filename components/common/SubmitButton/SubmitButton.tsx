"use client";

import Button from "@/components/ui/Button/Button";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
}

function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const dict = useDictionary();

  return (
    <Button type="submit" fullWidth isLoading={pending}>
      {pending ? dict.loading.message : text}
    </Button>
  );
}

export default SubmitButton;
