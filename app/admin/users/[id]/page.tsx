import { SiteHeader } from "@/components/site-header";
import ProfileFormSkeleton from "@/components/skeletons/profile-form-skeleton";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/user-form";
import prisma from "@/lib/prisma";
import { Frown } from "lucide-react";
import { Suspense } from "react";

async function UserDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<ProfileFormSkeleton />}>
      <UserDetailForm id={id} />
    </Suspense>
  );
}

async function UserDetailForm({ id }: { id: string }) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return (
      <>
        <SiteHeader variant="destructive" title="User not found" />
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="flex justify-between gap-x-4">
            User not found
            <Frown />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteHeader title={user.name ?? user.email} />
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
            <UserForm user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
