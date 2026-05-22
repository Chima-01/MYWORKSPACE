"use client";

import { postSchema, type PostSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import createPostAction from "@/app/actions";
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";


export default function CreatePage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  const onSubmit = (data: PostSchema) => {
   startTransition(async () => {
    await createPostAction(data);
   });
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-4xl tracking-tight sm:text-5xl">Create Post</h1>
        <p className="text-lg text-muted-foreground pt-4">
          Share your thoughts with the world.
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>
            What's on your mind? Write an article to share your ideas, stories, and insights with the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                control={form.control}
                  name="title"
                  render={({field, fieldState}) => (
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input aria-invalid={fieldState.invalid} placeholder="My Blog Post" {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              <Controller
                control={form.control}
                  name="content"
                  render={({field, fieldState}) => (
                    <Field>
                      <FieldLabel>Content</FieldLabel>
                      <Textarea aria-invalid={fieldState.invalid} placeholder="Write your blog post here..." {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              <Controller
                control={form.control}
                  name="image"
                  render={({field, fieldState}) => (
                    <Field>
                      <FieldLabel>Image</FieldLabel>
                      <Input aria-invalid={fieldState.invalid}
                      placeholder="Upload image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                       />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {
                    isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      <span>Loading...</span>
                    </>)
                  : (
                    <span>Post</span>
                  )}
                </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}