import { bookmarks } from "~/data/bookmarks.ts";
import { write } from "~/tools/libs/write.ts";

// Issueのbody
let id = Deno.args[0];
if (!id) {
  throw new Error("IDがありません");
}

id = id.trim();

const target = bookmarks.find((b) => b.id === id);
if (!target) {
  throw new Error("削除対象が見つかりません");
}

const newBookmarks = bookmarks.filter((b) => b.id !== id);
write(newBookmarks);

console.log(`[OK] 削除しました: ${target.title}`);
