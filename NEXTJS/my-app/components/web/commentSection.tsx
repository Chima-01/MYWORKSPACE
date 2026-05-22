"use client";

import { commentSchema, type CommentInput } from "@/app/schemas/comment";
import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsForPost>;
}) {
  const params = useParams<{ blogId: Id<"posts"> }>();
  const comments = usePreloadedQuery(props.preloadedComments);
  const createComment = useMutation(api.comments.createComment);
  const [isPending, startTransition] = useTransition();
  const form  = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
    postId: params.blogId,
    content: "",
    },
  });

  const onSubmit = (data: CommentInput) => { 
    startTransition(async () => {
      try {
        await createComment(data);
        toast.success("Comment added successfully!");
        form.reset();
      } catch (error) {
        toast.error("Failed to add comment.");
      }
    });
  };

  return (
    <Card className="p-4 mb-4">
      <CardHeader className="flex flex-row items-center border-b gap-2">
        <h2 className="text-2xl font-bold">{comments.length} Comments</h2>
        <MessageCircle />
      </CardHeader>
      <CardContent className="space-y-8">
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            control={form.control}
              name="content"
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Write a comment</FieldLabel>
                  <Textarea aria-invalid={fieldState.invalid} placeholder="Share your thoughts..." {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit" className="self-end" disabled={isPending}>
                  {
                    isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      <span>Loading...</span>
                    </>)
                  : (
                    <span>Share Comment</span>
                  )}
            </Button>
        </form>
        <section className="space-y-6 mt-8">
          { comments && comments.map((comment) => (
              <div key={comment._id} className="flex gap-4 border rounded-lg p-4">
                <Avatar  className="size-10 shrik-0">
                  <AvatarImage src={`https://avatar.vercel.sh/${comment.authorName}`} alt="Avatar" />
                  <AvatarFallback>
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{comment.authorName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(comment._creationTime).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))
          }
        </section>
      </CardContent>
    </Card>
  );
}
