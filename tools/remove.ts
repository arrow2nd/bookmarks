import { bookmarks } from "~/data/bookmarks.ts";
import { write } from "~/tools/libs/write.ts";

const id = Deno.args[0];
if (!id) {
  throw new Error("IDがありません");
}

const newBookmarks = bookmarks.filter((b) => b.id !== id);

write(newBookmarks);

console.log(
  `[OK] 削除しました: ${bookmarks.find((b) => b.id === id)?.title}`,
);
