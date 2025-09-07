"use client";

import Image from "next/image";
import { useUser } from "@stackframe/stack";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

export default function Home() {
  const user = useUser();
  const { isLoading: convexAuthLoading, isAuthenticated: convexAuthenticated } = useConvexAuth();
  
  // Only query Convex when we're authenticated
  const convexUser = useQuery(api.users.getCurrentUser, convexAuthenticated ? {} : "skip");
  const authenticatedMessage = useQuery(api.users.getAuthenticatedMessage, convexAuthenticated ? {} : "skip");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Stack Auth + Convex Integration</h1>
          
          {/* Stack Auth Status */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Stack Auth Status</h2>
            {user ? (
              <div>
                <p className="text-green-600 dark:text-green-400">✅ Authenticated with Stack Auth</p>
                <p>Email: {user.primaryEmail}</p>
                <p>Display Name: {user.displayName}</p>
              </div>
            ) : (
              <p className="text-red-600 dark:text-red-400">❌ Not authenticated with Stack Auth</p>
            )}
          </div>

          {/* Convex Auth Status */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Convex Auth Status</h2>
            {convexAuthLoading ? (
              <p className="text-yellow-600 dark:text-yellow-400">⏳ Loading Convex authentication...</p>
            ) : convexAuthenticated ? (
              <div>
                <p className="text-green-600 dark:text-green-400">✅ Authenticated with Convex</p>
                {convexUser && (
                  <div className="mt-2">
                    <p>Convex User ID: {convexUser.id}</p>
                    <p>Name: {convexUser.name}</p>
                    <p>Email: {convexUser.email}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-600 dark:text-red-400">❌ Not authenticated with Convex</p>
            )}
          </div>

          {/* Integration Test */}
          {convexAuthenticated && authenticatedMessage && (
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">Integration Test</h2>
              <p className="text-green-800 dark:text-green-200">{authenticatedMessage}</p>
            </div>
          )}

          {/* Sign In/Out */}
          <div className="mt-6">
            {user ? (
              <Link href="/handler/sign-out" className="text-blue-500 hover:underline">
                Sign Out
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link href="/handler/sign-in" className="text-blue-500 hover:underline">
                  Sign In
                </Link>
                <Link href="/handler/sign-up" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Stack Auth is configured and ready to use
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
