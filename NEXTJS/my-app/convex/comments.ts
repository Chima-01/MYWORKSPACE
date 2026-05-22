import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const getCommentsForPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db.query("comments")
    .filter(q => q.eq(q.field("postId"), args.postId))
    .order("desc").collect();
    return comments;
  }
});

export const createComment = mutation({
  args: { postId: v.id("posts"), content: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
  
    if (!user) {
      throw new Error("Not authenticated");
    }

    const comment = await ctx.db.insert("comments", {
      postId: args.postId,
      content: args.content,
      authorId: user._id,
      authorName: user.name,
    });
    return comment;
  }
});