"use client";

import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-semibold text-red-600 mb-2">Authentication Failed</h1>
      <p className="text-gray-600 mb-6">
        Something went wrong while trying to sign you in. Please try again or use another method.
      </p>

      <Link
        href="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Back to Login
      </Link>
    </div>
  );
}
