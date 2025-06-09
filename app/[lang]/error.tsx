"use client";

import { useEffect } from "react";
import { useDictionary } from '@/lib/hooks/useDictionary';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dict = useDictionary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="error">
      <h1>{dict.error.title}</h1>
      <p>{dict.error.message}</p>
      <button onClick={reset}>{dict.error.tryAgain}</button>
    </main>
  );
}
