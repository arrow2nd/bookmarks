const baseURL = "https://github.com/arrow2nd/bookmarks/issues/new";

/**
 * 追加用のIssue URLを作成
 * @param url URL
 * @param tag タグ
 * @returns URL
 */
export function createAddIssueURL(url: string, tag: string) {
  const issueURL = new URL(baseURL);
  const body = `## URL
${url}
## タグ
${tag}`;

  issueURL.searchParams.append("title", "🔖 ブックマークを追加");
  issueURL.searchParams.append("body", body);
  issueURL.searchParams.append("labels", "add");

  return issueURL.href;
}

/**
 * 削除のIssue URLを作成
 * @param id ID
 * @returns URL
 */
export function createRemoveIssueURL(id: string, title: string) {
  const issueURL = new URL(baseURL);

  issueURL.searchParams.append("title", `🔖 ブックマークを削除 (${title})`);
  issueURL.searchParams.append("body", id);
  issueURL.searchParams.append("labels", "remove");

  return issueURL.href;
}
