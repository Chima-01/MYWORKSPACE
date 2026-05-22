'use client';
import Link from 'next/link';
import { buttonVariants, Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import SearchInput from './searchInput';

export function Navbar () {
  const {isAuthenticated, isLoading} = useConvexAuth();
  const router = useRouter();
  
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold uppercase">
            Blog<span className="text-blue-500">ger</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost"})}>Home</Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost"})}>Blog</Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost"})}>Create</Link>
        </div>
      </div>

        <div className="flex items-center gap-2">
          {isLoading ? null : isAuthenticated ? (
          <>
          <div className='hidden md:block mr-2'>
            <SearchInput />
          </div>
            <Button onClick={() => authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  toast.success("Logged out successfully");
                  router.push("/auth/login");
                },
                onError: (error) => {
                  toast.error(error.error?.message || "An error occurred while logging out");
                }
              }
            })} 
              variant="outline">
              Logout
            </Button>
            </>
          ) : (
            <>
              <Link href="/auth/sign-up" className={buttonVariants({ variant: "default" })}>Sign Up</Link>
              <Link href="/auth/login" className={buttonVariants({ variant: "outline" })}>Login</Link>
            </>
          )}
          <ThemeToggle />
        </div>
    </nav>
  );
}