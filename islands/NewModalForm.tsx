import { useSignal } from "@preact/signals";
import { createAddIssueURL } from "~/libs/gh.ts";
import IconBookmarkEdit from "tabler-icons/bookmark-edit.tsx";
import IconArrowBack from "tabler-icons/arrow-back.tsx";

type NewFormProps = {
  options: string[];
};

export default function NewFormModal({ options }: NewFormProps) {
  const showModal = useSignal(false);
  const tag = useSignal(options[0]);
  const url = useSignal("");

  return (
    <>
      {showModal.value &&
        (
          <div class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black opacity-50">
            <form
              class="mx-8 w-full px-4 flex items-center bg-white border-2 border-gray-200 focus-within:border-gray-500 rounded-lg animate-fade-in"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = createAddIssueURL(
                  url.value,
                  tag.value,
                );
              }}
            >
              <select
                onChange={(e) => {
                  tag.value = e.currentTarget.value;
                }}
              >
                {options.map((t) => <option value={t}>{t}</option>)}
              </select>
              <input
                class="flex-1 px-4 py-2 focus:outline-none"
                placeholder="ブックマークに追加するURL"
                onInput={(e) => {
                  url.value = e.currentTarget.value;
                }}
              />
              <button type="submit">
                <IconBookmarkEdit />
              </button>
            </form>
          </div>
        )}
      <button
        class="fixed right-6 bottom-6 p-4 rounded-lg text-stone-100 bg-gray-800 hover:bg-gray-500 transition-colors z-10"
        onClick={() => showModal.value = !showModal.value}
      >
        {showModal.value ? <IconArrowBack /> : <IconBookmarkEdit />}
      </button>
    </>
  );
}
