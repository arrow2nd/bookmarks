import { HandlerContext } from "$fresh/server.ts";
import { bookmarks } from "~/data/bookmarks.ts";

/**
 * タグ一覧
 * GET /api/tags
 */
export const handler = (req: Request, _ctx: HandlerContext): Response => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  // 重複削除
  const tags = [...new Set(bookmarks.map(({ tag }) => tag))];

  return new Response(JSON.stringify(tags));
};
