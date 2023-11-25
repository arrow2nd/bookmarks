import { Bookmark } from "~/types/bookmark.ts";

/**
 * 書き込む
 * @param newBookmarks 新しいブックマーク配列
 */
export function write(newBookmarks: Bookmark[]) {
  const out = `
  import { Bookmark } from "~/types/bookmark.ts";

  export const bookmarks: Bookmark[] = ${JSON.stringify(newBookmarks)};
  `;

  Deno.writeTextFileSync("./data/bookmarks.ts", out);
}
