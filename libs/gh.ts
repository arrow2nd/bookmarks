const baseURL = "https://github.com/arrow2nd/bookmarks/issues/new";

/**
 * 削除のIssue作成URL
 * @param id ID
 * @returns URL
 */
export function createRemoveIssueURL(id: string, title: string) {
  const url = new URL(baseURL);

  url.searchParams.append("title", `🔖 ブックマークを削除 (${title})`);
  url.searchParams.append("body", id);
  url.searchParams.append("labels", "remove");

  return url.href;
}
