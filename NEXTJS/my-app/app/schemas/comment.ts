import { z } from 'zod';
import {Id } from '@/convex/_generated/dataModel'

export const commentSchema = z.object({
  postId: z.custom<Id<'posts'>>(),
  content: z.string().min(5),
});

export type CommentInput = z.infer<typeof commentSchema>;