import { bookmarks } from "~/data/bookmarks.ts";
import { write } from "~/tools/libs/write.ts";

// Issueのbody
const body = Deno.args[0];
if (!body) {
  throw new Error("bodyがありません");
}

const id = body.match(/(?<=ID\s)(.+)/)?.[0];
console.log(body, body.match(/(?<=ID\s)(.+)/));
if (!id) {
  throw new Error("IDがありません");
}

const target = bookmarks.find((b) => b.id === id);
if (!target) {
  throw new Error("削除対象が見つかりません");
}

const newBookmarks = bookmarks.filter((b) => b.id !== id);
write(newBookmarks);

console.log(`[OK] 削除しました: ${target.title}`);
