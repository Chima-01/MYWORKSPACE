"use server";
import { fetchMutation }  from "convex/nextjs";
import { getToken } from "@/lib/auth-server";
import { postSchema, type PostSchema } from "./schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export default async function createPostAction(data: PostSchema) {
  try {
    const parsedData = postSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error(`Invalid post data: ${parsedData.error?.message}`);
    }

    const token = await getToken();
    const imageUploadUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, { token });
  
    const response = await fetch(imageUploadUrl, {
      method: "POST",
      headers: { 
        "Content-Type": parsedData.data.image.type,
      },
      body: parsedData.data.image,
    });

    if (!response.ok) { 
      return {
        success: false,
        message: `Image upload failed with status ${response.status}`,
      }
    }
    const { storageId } = await response.json();

    await fetchMutation(api.posts.createPost, {
      title: parsedData.data.title,
      content: parsedData.data.content,
      imageStorageId: storageId,
    }, { token });
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An unknown error occurred",
    }
  }

  updateTag("blog");
  return redirect("/blog");

}