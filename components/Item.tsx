import { Bookmark } from "~/types/bookmark.ts";

export default function Item(
  { title, url, tag, description, color }: Bookmark,
) {
  const subText = description ? `${tag} | ${description}` : tag;

  return (
    <div class="flex items-center animate-fade-in">
      <div
        class={`w-3 h-3 border-gray-200 rounded-full bg-[${color}]`}
      />
      <div class="ml-6">
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
    </div>
  );
}
