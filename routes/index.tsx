import BookmarkList from "~/islands/BookmarkList.tsx";
import NewFormModal from "~/islands/NewModalForm.tsx";
import { bookmarks } from "~/data/bookmarks.ts";

export default function Home() {
  const tags = [...new Set(bookmarks.map(({ tag }) => tag))];

  return (
    <div class="max-w-screen-md">
      <BookmarkList options={tags} />
      <NewFormModal options={tags} />
    </div>
  );
}
