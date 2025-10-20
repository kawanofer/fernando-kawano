'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="container mx-auto">
      <h2 className="font-heading mb-10 text-red-800">Something went wrong!</h2>
    </div>
  );
}
