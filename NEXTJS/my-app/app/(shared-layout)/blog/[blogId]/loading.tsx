import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
   <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <Skeleton className="h-10 w-24 mb-4" />
      <Skeleton className="h-100 w-full mb-8 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}