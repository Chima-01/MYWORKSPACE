import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ReactNode } from "react";

export default function AuthLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-screen flex justify-between items-center">
      <div className="absolute top-4 left-4">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
         <ArrowLeft className="size-4" />
          Go Back
        </Link>
      </div>
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}