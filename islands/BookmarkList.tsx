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
    <div>
      <form
        class="w-full px-4 flex items-center bg-white border-2 border-gray-200 focus-within:border-gray-500 rounded-lg"
        onSubmit={(e) => {
          handleSubmit();
          e.preventDefault();
        }}
      >
        <select
          onChange={(e) => {
            tag.value = e.currentTarget.value;
            console.log(e);
          }}
        >
          <option value="all">すべて</option>
          {options.map((t) => <option value={t}>{t}</option>)}
        </select>
        <input
          class="flex-1 px-4 py-2 focus:outline-none"
          placeholder="Search"
          onInput={(e) => {
            query.value = e.currentTarget.value;
          }}
        />
        <button type="submit">
          <IconSearch />
        </button>
      </form>
      <div class="mt-8 px-2">
        {results.value.map((bookmark) => <Item {...bookmark} />)}
      </div>
    </div>
  );
}
