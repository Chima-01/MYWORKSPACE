"use client";
import { signUpSchema, type SignUpSchema } from "../../schemas/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async(data: SignUpSchema) => {
    startTransition(async () => { 
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/auth/login");
          },
          onError: (error) => {
            toast.error(error.error?.message || "An error occurred while creating the account");
          }
        }
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create an account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FieldGroup className="gap-y-4">
            <Controller
              control={form.control}
              name="name"
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="john.doe@example.com" type="email" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="••••••••" type="password" {...field} />
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
                <span>Sign Up</span>
                )}
              </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
