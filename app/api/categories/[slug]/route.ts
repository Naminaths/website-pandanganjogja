import { getCategoryBySlug, getHomeData } from "@/lib/paijo/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [category, home] = await Promise.all([getCategoryBySlug(slug), getHomeData()]);

  if (!category) {
    return Response.json({ message: "Category not found" }, { status: 404 });
  }

  return Response.json({
    category,
    stories: [...home.latest, ...home.spotlight, ...home.hero].filter(
      (story) => story.categorySlug === slug
    ),
  });
}

