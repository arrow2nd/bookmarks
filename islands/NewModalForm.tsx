import { useSignal } from "@preact/signals";
import { createAddIssueURL } from "~/libs/gh.ts";
import IconBrandGithub from "tabler-icons/brand-github.tsx";
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
          <div class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen">
            <div class="fixed w-screen h-screen bg-black opacity-50" />
            <form
              class="md:w-1/2 mx-4 p-4 md:p-6 bg-white rounded-md shadow-2xl animate-fade-in z-10"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = createAddIssueURL(
                  url.value,
                  tag.value,
                );
              }}
            >
              <div class="flex">
                <label class="text-sm text-gray-500">ラベル :</label>
                <select
                  class="block bg-white"
                  onChange={(e) => {
                    tag.value = e.currentTarget.value;
                  }}
                >
                  {options.map((t) => <option value={t}>{t}</option>)}
                </select>
              </div>
              <input
                class="w-full mt-2 text-4xl md:text-5xl bg-white focus:outline-none"
                placeholder="URLを入力"
                onInput={(e) => {
                  url.value = e.currentTarget.value;
                }}
              />
              <div class="mt-2 text-right">
                <button
                  type="submit"
                  class="inline-flex items-center px-4 py-2 text-sm rounded-lg text-stone-100 bg-gray-800 hover:bg-gray-500 transition-colors"
                >
                  <IconBrandGithub class="mr-1 w-5 h-5" />
                  ブックマークを追加
                </button>
              </div>
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
