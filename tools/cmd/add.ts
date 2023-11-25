import { toHashString } from "$std/crypto/to_hash_string.ts";
import { DOMParser } from "deno-dom-wasm";

import { Bookmark } from "~/types/bookmark.ts";
import { bookmarks } from "~/data/bookmarks.ts";
import { getThemeColor } from "~/tools/libs/color.ts";
import { write } from "~/tools/libs/write.ts";

/**
 * ブックマークを追加
 * @param url URL
 */
export async function addBookmark(url: string, tag?: string) {
  // URLが有効か確認
  if (!URL.canParse(url)) {
    throw new Error("URLの形式が不正です");
  }

  // ファビコン・タイトル・説明を取得
  const res = await fetch(url, {
    headers: {
      "Accept": "text/html",
    },
  });

  if (!res) {
    throw new Error("Webサイトを取得できませんでした: レスポンスがありません");
  }

  if (!res.ok) {
    throw new Error(`Webサイトを取得できませんでした: ${res.status}`);
  }

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (!doc) {
    throw new Error(`HTMLのパースに失敗しました\n${html}`);
  }

  const description =
    doc.querySelector('meta[name="description"]')?.getAttribute("content") ??
      undefined;

  // ファビコンからテーマカラーを抽出
  const faviconLink = doc.querySelector('link[rel="icon"]') ||
    doc.querySelector('link[rel="shortcut icon"]');

  const faviconUrl =
    new URL(faviconLink?.getAttribute("href") || "/favicon.ico", url).href;

  const color = await getThemeColor(faviconUrl);

  // ID
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(url));
  const id = toHashString(digest);

  // ブックマークに追加
  const addBookmark: Bookmark = {
    id,
    title: doc.title,
    url,
    tag: tag || "その他",
    description,
    color,
  };

  const newBookmarks = [...bookmarks];
  const index = bookmarks.findIndex(({ id }) => id === addBookmark.id);

  if (index !== -1) {
    newBookmarks[index] = addBookmark;
  } else {
    newBookmarks.push(addBookmark);
  }

  write(newBookmarks);

  console.log(`[OK] 追加しました: ${addBookmark.title}`);
}
