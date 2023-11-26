import IconDogBowl from "tabler-icons/dog-bowl.tsx";

import BookmarkList from "~/islands/BookmarkList.tsx";
import NewFormModal from "~/islands/NewModalForm.tsx";
import { bookmarks } from "~/data/bookmarks.ts";

export default function Home() {
  const tags = [...new Set(bookmarks.map(({ tag }) => tag))];

  return (
    <div class="m-auto p-6 md:p-8 max-w-screen-sm">
      <h1 class="mb-4 flex items-center text-2xl font-semibold">
        <IconDogBowl />
        <span class="ml-1">bookmarks</span>
      </h1>
      <BookmarkList options={tags} />
      <NewFormModal options={tags} />
    </div>
  );
}
