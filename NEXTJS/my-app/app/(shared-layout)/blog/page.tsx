import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
// import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";
import type { FunctionReturnType } from "convex/server";

// export const dynamic = "force-static";
// export const revalidate = 60; // Revalidate every 60 seconds


export const metadata: Metadata = { 
  title: "Blogs",
  description: "Explore our latest blog posts and stay updated with industry trends.",
  category: "Technology Blog",
  authors: [{ name: "Chima" }],
};

type PostProps = FunctionReturnType<typeof api.posts.getPost>

export default async function BlogPage() {
  return (
    <div className="py-16">
      <div className="pb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Blogs
        </h1>
        <p className="pt-4 mx-auto max-w-2xl text-xl text-muted-foreground">
          Insights and stories from our team, sharing knowledge and experiences in the world of technology, development, and innovation. Explore our latest articles and stay updated with industry trends.
        </p>
      </div>

      <Suspense fallback={<SkeletonLoadingUI />}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}

async function BlogPosts() {
  "use cache";
  cacheLife("minutes");
  cacheTag("blog");

  let posts: PostProps = [];

  try {
    posts = await fetchQuery(api.posts.getPost);
  } catch (error) {
    console.log("An error occured while fetching post", error);
  }

  if (!posts || posts.length === 0) {
    return (
    <div className="flex flex-col items-center justify-center min-h-100 p-8 text-center">
      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
      <h3 className="text-lg font-semibold text-white">No blog posts found</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">We couldn't find any articles right now. Check back later or try refreshing the page.</p>
    </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3 md:grid-col-2">
      {posts?.map((post) => (
        <Card key={post._id} className="border-2 border-muted pt-0">
          <div className="relative h-48 w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
            <Image
              src={ post.imageUrl ??
                "/no-image.png"}
                alt="blog image"
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <CardContent>
              <Link href={`/blog/${post._id}`} className="text-2xl font-bold hover:underline">
                {post.title}
              </Link>
              <p className="pt-2 text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post._id}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
  );
}

function SkeletonLoadingUI() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 md:grid-col-2" suppressHydrationWarning>
      {Array.from({ length: 6}).map((_, i) => (
        <Card key={i} className="border-2 border-muted pt-0">
          <div className="relative h-48 w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-muted" />
          <CardContent>
            <h3 className="text-2xl font-bold bg-muted h-8 w-3/4" />
            <p className="pt-2 text-muted-foreground bg-muted h-4 w-full" />
          </CardContent>
          <CardFooter>
            <button className={buttonVariants({ variant: "outline", className: "w-full" })} disabled>
              Read more
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
