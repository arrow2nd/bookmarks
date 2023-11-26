import { PageProps } from "$fresh/server.ts";

import IconDogBowl from "tabler-icons/dog-bowl.tsx";
import BookmarkList from "~/islands/BookmarkList.tsx";
import NewFormModal from "~/islands/NewModalForm.tsx";

export default async function Home(props: PageProps) {
  const path = new URL("./api/tags", props.url);

  const res = await fetch(path);
  const json = await res.json() as string[];

  return (
    <div class="m-auto p-6 md:p-8 max-w-screen-sm">
      <h1 class="mb-4 flex items-center text-2xl font-semibold">
        <IconDogBowl />
        <span class="ml-1">bookmarks</span>
      </h1>
      <BookmarkList options={json} />
      <NewFormModal options={json} />
    </div>
  );
}
