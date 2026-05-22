import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import type { Doc } from "./_generated/dataModel";

// Create a new post with the given title and content
export const createPost = mutation({
  args: { title: v.string(), content: v.string(), imageStorageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new Error("Not authenticated");
    }
     
    const newPostId = await ctx.db.insert("posts", { 
       authorId: user._id,
       title: args.title,
       content: args.content,
       imageStorageId: args.imageStorageId
      });

    return newPostId;
  },
});

export const getPost = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return await Promise.all(posts.map(async (post) => { 
      const imageUrl = post.imageStorageId ? await ctx.storage.getUrl(post.imageStorageId) : null;
      return { ...post, imageUrl };
    }));
   }
});

export const generateImageUploadUrl = mutation({ 
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new Error("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  }
});

interface SearchResultType { 
  _id: string;
  title: string;
  content: string;
}

export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => { 
    const post = await ctx.db.get("posts", args.postId);
  
    if (!post) { 
      return null;
    }

    const imageUrl = post.imageStorageId ? await ctx.storage.getUrl(post.imageStorageId) : null;
    return { ...post, imageUrl };
  }
});

export const searchPosts = query({ 
  args: { term: v.string(), limit: v.number() },
  handler: async (ctx, args) => {
    const limit = args.limit || 5;
    const result: SearchResultType[] = [];
    const seenPostIds = new Set();

    const pushUniquePosts = async (posts: Array<Doc<"posts">>) => {
      for (const post of posts) { 
        if (seenPostIds.has(post._id)) { continue; }
        seenPostIds.add(post._id);
        result.push({
          _id: post._id,
          title: post.title,
          content: post.content,
        });

        if (result.length >= limit) break;
      }
    }

    const titleMatches = await ctx.db.query("posts")
    .withSearchIndex("searchTitle", (q) => q.search("title", args.term)).take(limit);

    await pushUniquePosts(titleMatches);

    if (result.length < limit)  {
      const contentMatches = await ctx.db.query("posts")
        .withSearchIndex("searchContent", (q) => q.search("content", args.term))
        .take(limit - result.length);
      await pushUniquePosts(contentMatches);
    }

    return result;
  }
});