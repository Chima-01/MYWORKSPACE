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

// export const dynamic = "force-static";
// export const revalidate = 60; // Revalidate every 60 seconds


export const metadata: Metadata = { 
  title: "Blogs",
  description: "Explore our latest blog posts and stay updated with industry trends.",
  category: "Technology Blog",
  authors: [{ name: "Chima" }],
};

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

  const posts = await fetchQuery(api.posts.getPost);

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
