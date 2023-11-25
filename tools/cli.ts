import { addBookmark } from "~/tools/cmd/add.ts";
import { removeBookmark } from "~/tools/cmd/remove.ts";

switch (Deno.args[0]) {
  case "add": {
    const [, url, tag] = Deno.args;
    if (!url) {
      error("URLが必要です");
    }
    await addBookmark(url, tag);
    break;
  }
  case "remove": {
    const [, id] = Deno.args;
    if (!id) {
      error("IDが必要です");
    }
    removeBookmark(id);
    break;
  }
  default:
    error(`コマンドが見つかりません: ${Deno.args[0]}`);
}

function error(msg: string) {
  console.error(`[ERR] ${msg}`);
  Deno.exit(1);
}
