import { SiteHeader } from "@/components/site-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserDataTable } from "@/components/user-data-table";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

async function UsersList() {
  return (
    <>
      <SiteHeader title="User Management" />
      <div className="flex flex-col flex-1 gap-4 px-2 py-4">
        <Suspense fallback={<UserTableSkeleton />}>
          <UserTable />
        </Suspense>
      </div>
    </>
  );
}

async function UserTable() {
  const users = await prisma.user.findMany();
  return <UserDataTable data={users} />;
}

function TableSkeleton() {
  return (
    <div className="rounded-xl border bg-background p-4">
      <Table>
        <TableBody>
          {Array.from({ length: 10 }).map((_, idx) => (
            <TableRow className="h-12 items-center" key={idx}>
              <TableCell>
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[140px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-6 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UserTableSkeleton() {
  return (
    <div className="w-full flex-col justify-start gap-4">
      <div className="flex items-center gap-x-4 px-4 lg:px-6 mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-28" />
      </div>
      <div className="px-4 lg:px-6">
        <TableSkeleton />
      </div>
    </div>
  );
}

export default UsersList;
