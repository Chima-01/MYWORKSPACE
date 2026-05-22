import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, PenTool, Globe, Zap } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "BLOGGER",
  description: "Every great movement started with a single written word. Create blogs sharw your thoughts, and beam your biggest ideas across the world."
}

export default function BlogIndex() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 space-y-16 max-w-5xl mx-auto">
      
      <section className="text-center space-y-6 max-w-2xl flex flex-col items-center">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border">
          Where ideas find their voice
        </span>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase bg-linear-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
          Welcome to Blog<span className="text-blue-500">ger</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Every great movement started with a single written word. Create blogs, 
          share your thoughts, and beam your biggest ideas across the world.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
          <Link href="/create" className={buttonVariants({ variant: "default", size: "lg", className: "hover:bg-blue-500" })}>
            Get Started 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "outline", size: "lg", className: "hover:bg-blue-500" })}>
            Browse Stories
          </Link>
        </div>
      </section>

      {/* 🚀 VISION SECTION: The Core Value Pillars */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        
        {/* Pillar 1 */}
        <Card className="bg-card/50 backdrop-blur border-muted/60">
          <CardContent className="pt-6 space-y-3">
            <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
              <PenTool className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Effortless Creation</h3>
            <p className="text-sm text-muted-foreground">
              A distraction-free environment that lets your ideas flow without limits
            </p>
          </CardContent>
        </Card>

        {/* Pillar 2 */}
        <Card className="bg-card/50 backdrop-blur border-muted/60">
          <CardContent className="pt-6 space-y-3">
            <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Global Reach</h3>
            <p className="text-sm text-muted-foreground">
              Instant publishing across thousands of readers with zero platform lock-in.
            </p>
          </CardContent>
        </Card>

        {/* Pillar 3 */}
        <Card className="bg-card/50 backdrop-blur border-muted/60">
          <CardContent className="pt-6 space-y-3">
            <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Optimized reading speeds powered by Next.js static generation capabilities.
            </p>
          </CardContent>
        </Card>

      </section>
    </div>
  )
}