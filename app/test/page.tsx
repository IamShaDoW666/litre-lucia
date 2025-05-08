import { verifySession } from "@/lib/dal";
export default async function Test() {
  const { userData } = await verifySession();
  return <div>{JSON.stringify(userData)}</div>;
}
