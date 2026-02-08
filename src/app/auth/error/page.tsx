"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, { title: string; message: string }> = {
    AccessDenied: {
      title: "Access Denied",
      message: "Your GitHub account is not on the approved client list. Please contact us to request access.",
    },
    Configuration: {
      title: "Configuration Error",
      message: "There's an issue with the authentication setup. Please try again later.",
    },
    default: {
      title: "Authentication Error",
      message: "Something went wrong during sign in. Please try again.",
    },
  };

  const { title, message } = errorMessages[error || ""] || errorMessages.default;

  return (
    <div className="min-h-screen bg-[--color-background] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[--color-text-primary] mb-2">{title}</h1>
        <p className="text-[--color-text-muted] mb-8">{message}</p>

        <div className="flex flex-col gap-3">
          <Link
            href="/auth/signin"
            className="px-6 py-3 bg-[--color-primary] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </Link>
          <a
            href="mailto:hello@162limited.com"
            className="px-6 py-3 bg-[--color-surface-raised] text-[--color-text-primary] font-medium rounded-xl border border-[--color-border] hover:bg-[--color-border] transition-colors"
          >
            Request Access
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[--color-background] flex items-center justify-center">
        <div className="text-[--color-text-muted]">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
