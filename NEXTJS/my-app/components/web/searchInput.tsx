"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setOpen(true);
  };

  const result = useQuery(api.posts.searchPosts,
    searchTerm.length >= 2 ? { term: searchTerm, limit: 5 } : "skip");
  
  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="flex items-center justify-center gap-2">
        <Search className="absolute left-2.5 top-4.5 size-4 text-muted-foreground -translate-y-1/2" />
        <Input type="search"
          placeholder="Search posts..."
          className="pl-8 w-full bg-background"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
        { open && searchTerm.length >= 2 && (
          <div className="absolute top-full left-0 w-full border bg-popover text-popover-foreground rounded-md mt-2 shadow-md outline-none animate-in fade-in-0 zoom-in-95">
            {
              result === undefined ? (
               <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                <Loader2  className="mr-2 animate-spin size-4"/>
                <p>Searching...</p>
               </div>
              ) : result.length > 0 ? (
                <div className="space-y-1">
                  {result.map((post) => (
                    <Link key={post._id}
                    href={`/blog/${post._id}`}
                    onClick={ () => {
                      setOpen(false);
                      setSearchTerm("");
                    }}
                    className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground pt-1">{post.content.substring(0, 50)}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center p-4">
                  No posts found.
                </p>
              )
            }
          </div>
        )}
    </div>
  );
}