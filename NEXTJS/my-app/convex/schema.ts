import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  }).searchIndex("searchTitle", { searchField: "title" }).searchIndex("searchContent", { searchField: "content" }),

  comments: defineTable({
    postId: v.id("posts"),
    content: v.string(),
    authorId: v.string(),
    authorName: v.string(),
  }),
});