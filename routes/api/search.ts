import { HandlerContext } from "$fresh/server.ts";
import { bookmarks } from "~/data/bookmarks.ts";

/**
 * 検索
 * GET /api/search?tag=<タグ>&q=<クエリ>
 */
export const handler = (req: Request, _ctx: HandlerContext): Response => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const paramas = new URL(req.url).searchParams;

  const tag = paramas.get("tag")?.toString();
  const q = paramas.get("q")?.toString();

  // クエリ指定なしなら全件返す
  if (!q) {
    return new Response(JSON.stringify(bookmarks));
  }

  const results = bookmarks.filter((b) => {
    // タグ指定で絞り込み
    if (tag && b.tag !== tag) {
      return false;
    }

    // 簡易ファジー検索
    const pattern = q.split("").join(".*");
    const regex = new RegExp(pattern, "i");

    return regex.test(b.title);
  });

  return new Response(JSON.stringify(results));
};
