"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Fetch current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.subscription.unsubscribe();
  }, [supabase]);

  return (
    <nav className="w-full flex items-center justify-between p-4 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">ALXPOLL</Link>

      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hover:underline">
            Polls
          </Link>
          <Link href="/polls" className="hover:underline">
            Survey
          </Link>
          <Button
            variant="outline"
            onClick={async () => {
               setUser(null);
              router.push('/login');
              await supabase.auth.signOut();
            }}
          >
            Logout
          </Button>

          <Avatar>
            <AvatarImage src={user.user_metadata?.avatar_url || ""} alt="User avatar" />
            <AvatarFallback>
              {user.user_metadata?.firstname?.[0] || user.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
