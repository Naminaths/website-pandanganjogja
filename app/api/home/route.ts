import { getHomeData } from "@/lib/paijo/content";

export async function GET() {
  const data = await getHomeData();
  return Response.json(data);
}

