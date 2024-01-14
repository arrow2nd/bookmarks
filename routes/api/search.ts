import { FreshContext } from "$fresh/server.ts";
import { bookmarks } from "~/data/bookmarks.ts";

/**
 * 検索
 * GET /api/search?tag=<タグ>&q=<クエリ>
 */
export const handler = (req: Request, _ctx: FreshContext): Response => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const params = new URL(req.url).searchParams;

  const tag = params.get("tag")?.toString() || "all";
  const q = params.get("q")?.toString();

  const results = bookmarks.filter((b) => {
    // タグ指定で絞り込み
    if (tag !== "all" && b.tag !== tag) {
      return false;
    }

    if (!q) {
      return true;
    }

    // 部分一致
    const regex = new RegExp(q, "i");

    // タイトル or 説明文にマッチするか
    return regex.test(b.title) ||
      (b.description && regex.test(b.description || ""));
  });

  return new Response(JSON.stringify(results));
};
