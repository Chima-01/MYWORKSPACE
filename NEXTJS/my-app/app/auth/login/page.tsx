"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/app/schemas/auth";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const onSubmit = (data: LoginSchema) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error?.message || "An error occurred while logging in");
          }
        } 
      });
    });
  }
  
  return (
  <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Login</CardTitle>
          <CardDescription>
            Sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FieldGroup className="gap-y-4">
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
                <span>Login</span>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
  );
}