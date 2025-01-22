"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-main">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}
