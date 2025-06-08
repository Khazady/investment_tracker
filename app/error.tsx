"use client";

export default function ErrorPage(
  props: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
  }>,
) {
  console.log(props.error.message);
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
      <button onClick={props.reset}>Try again</button>
    </main>
  );
}
