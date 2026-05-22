import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CommentSection } from "@/components/web/commentSection";
import { Metadata } from "next";
import PostPresence from "@/components/web/PostPresence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

interface BlogPageProps {
  params: Promise<{
    blogId: Id<"posts">;
  }>;
}

export const generateMetadata = async ({ params }: BlogPageProps): Promise<Metadata> =>  {
  const { blogId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: blogId });
  
  if (!post) {
    return { 
      title: "Blog Post Not Found",
    }
  }

  return ({
    title: `Blog Post: ${post.title}`, 
    description: `Read our latest blog post titled "${post.title}" and explore insights, stories, and knowledge shared by our team in the world of technology, development, and innovation. Stay updated with industry trends and discover valuable information in this engaging article.`
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { blogId } = await params;
  const token = await getToken();
  const [post, preloadedComments, userId] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId: blogId }),
    preloadQuery(api.comments.getCommentsForPost, {
      postId: blogId,
    }),
    fetchQuery(api.presence.getUserId, {}, { token })
  ]);

  if (!userId) {
    return (
      redirect("/auth/login")
     );
  }

  if (!post) {
    return (
      <h1 className="text-6xl font-extrabold py-20 text-red-500">Post not found</h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-500">
        <Link href="/blog" className={buttonVariants({ variant: "ghost",  className: "mb-4"})}>
        <ArrowLeft className="size-4" />
          Back to Blog
        </Link>
        <div className="relative w-full h-100 mb-8 shadow-sm overflow-hidden rounded-xl">
          <Image
            src={ post.imageUrl ?? "/no-image.png" }
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="space-y-4 flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{post.title}</h1>
          <div className="flex items-center gap-2">
            <p>Posted on: {new Date(post._creationTime).toLocaleDateString("en-GB")}</p>
            <PostPresence roomId={blogId} userId={userId ?? "unknown"}  />
          </div>
        </div>
        <Separator className="my-8" />
          <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.content}</p>
        <Separator className="my-8" />
        <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}