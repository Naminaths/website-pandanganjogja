import { getStoryBySlug } from "@/lib/paijo/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return Response.json({ message: "Article not found" }, { status: 404 });
  }

  return Response.json(story);
}

