"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="w-full h-screen justify-center items-center flex flex-col dotted-bg">
      <section className="flex flex-col w-2/3 items-start">
        <h2 className="text-6xl font-semibold">Sorry :(</h2>
        <h2 className="text-3xl">We couldn&apos;t find that page</h2>
        <h2 className="text-base">
          Try visting our{" "}
          <Link
            href={"/"}
            className="text-blue-400 hover:underline underline-offset-4"
          >
            home page
          </Link>{" "}
          or{" "}
          <Link
            href={"/dashboard"}
            className="text-blue-400 hover:underline underline-offset-4"
          >
            dashboard.
          </Link>
        </h2>
      </section>
    </main>
  );
}
