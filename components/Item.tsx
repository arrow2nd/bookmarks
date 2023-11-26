import IconTrashX from "tabler-icons/trash-x.tsx";
import { Bookmark } from "~/types/bookmark.ts";
import { createRemoveIssueURL } from "~/libs/gh.ts";

export default function Item(
  { id, title, url, tag, description, color }: Bookmark,
) {
  const removeURL = createRemoveIssueURL(id, title);
  const subText = description ? `${tag} | ${description}` : tag;

  return (
    <div class="flex items-center animate-fade-in">
      <div
        class={`w-3 h-3 border-gray-200 rounded-full bg-[${
          color || "#D162CB"
        }]`}
      />
      <div class="flex-1 ml-6">
        <a
          class="block underline font-semibold hover:text-gray-500"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        <span class="text-sm text-gray-500 overflow-hidden text-ellipsis">
          {subText}
        </span>
      </div>
      <a
        class="ml-1 text-gray-400 hover:text-red-400 transition-colors"
        href={removeURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconTrashX />
      </a>
    </div>
  );
}
