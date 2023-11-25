import { bookmarks } from "~/data/bookmarks.ts";
import { write } from "~/tools/libs/write.ts";

/**
 * ブックマークを削除
 * @param id ID
 */
export function removeBookmark(id: string) {
  const newBookmarks = bookmarks.filter((b) => b.id !== id);

  write(newBookmarks);

  console.log(
    `[OK] 削除しました: ${bookmarks.find((b) => b.id === id)?.title}`,
  );
}
