import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="flex h-full flex-col pt-14 pb-20 md:px-20">
      <div className="flex h-72 items-center py-20">
        <div className="flex h-full items-center justify-center">
          <Skeleton className="size-40 rounded-full bg-slate-900" />
        </div>
        <div className="flex flex-col justify-center pl-8">
          <Skeleton className="mb-2 h-8 w-48 rounded bg-slate-900" />
          <Skeleton className="h-6 w-64 rounded bg-slate-900" />
        </div>
      </div>
      <Skeleton className="h-full rounded-xl bg-slate-900 pb-20" />
    </div>
  );
}
