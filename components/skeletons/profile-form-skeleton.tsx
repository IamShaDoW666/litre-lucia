import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";
import { SiteHeader } from "../site-header";

export default function ProfileFormSkeleton() {
  return (
    <>
      <SiteHeader title="" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col py-4 md:gap-6 md:py-6 px-8 ">
            <div className="flex flex-col gap-2">
              <h2 className="sm:text-xl font-bold">Profile</h2>
              <p className="text-muted-foreground text-sm">
                This is how others will see you in the panel
              </p>
            </div>
            <Separator />
            <SkeletonWrapper />
          </div>
        </div>
      </div>
    </>
  );
}

function SkeletonWrapper() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      {/* Name and Profile Image Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Save Button */}
      <div>
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
}
