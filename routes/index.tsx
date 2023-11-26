import { PageProps } from "$fresh/server.ts";

import IconDogBowl from "tabler-icons/dog-bowl.tsx";
import BookmarkList from "~/islands/BookmarkList.tsx";
import NewFormModal from "~/islands/NewModalForm.tsx";

export default async function Home(props: PageProps) {
  const path = new URL("./api/tags", props.url.toString());

  const res = await fetch(path);
  console.log(await res.text());
  const json = [];

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
