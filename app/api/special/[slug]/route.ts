import { getSpecialPageBySlug } from "@/lib/paijo/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await getSpecialPageBySlug(slug);

  if (!page) {
    return Response.json({ message: "Special content not found" }, { status: 404 });
  }

  return Response.json(page);
}

