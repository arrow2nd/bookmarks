import { useSignal } from "@preact/signals";
import IconSearch from "tabler-icons/search.tsx";

import { Bookmark } from "~/types/bookmark.ts";
import Item from "~/components/Item.tsx";

type BookmarkListProps = {
  options: string[];
};

export default function BookmarkList({ options }: BookmarkListProps) {
  const tag = useSignal("all");
  const query = useSignal("");
  const results = useSignal([] as Bookmark[]);

  const handleSubmit = () => {
    const endpoint = new URL("./api/search", window.location.href);

    endpoint.searchParams.append("q", query.value);
    if (tag.value !== "all") {
      endpoint.searchParams.append("tag", tag.value);
    }

    fetch(endpoint.href).then(async (res) => {
      results.value = await res.json();
    });
  };

  return (
    <>
      <form
        class="space-y-2"
        onSubmit={(e) => {
          handleSubmit();
          e.preventDefault();
        }}
      >
        <select
          class="block bg-stone-100"
          onChange={(e) => {
            tag.value = e.currentTarget.value;
            handleSubmit();
          }}
        >
          <option value="all">すべて</option>
          {options.map((t) => <option value={t}>{t}</option>)}
        </select>
        <input
          class="block text-4xl md:text-5xl bg-stone-100 focus:outline-none"
          placeholder="ブックマークを検索"
          onInput={(e) => {
            query.value = e.currentTarget.value;
          }}
        />
      </form>
      <div class="mt-8 px-2 space-y-4">
        {results.value.map((bookmark) => <Item {...bookmark} />)}
      </div>
    </>
  );
}
