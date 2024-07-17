"use client";
import CloseButton from "../../components/CloseButton";
import { supabase } from "../../db/supabase";
import { useDataStore, useUserStore } from "../../store";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";

export default function AddCategory() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  // const router = useRouter()
  const { userData } = useUserStore();

  const { categories, setCategoryData } = useDataStore();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!formData.get("name")) return;

    const { error, data } = await supabase
      .from("categories")
      .insert({
        name: formData.get("name"),
        user: userData?.id,
      })
      .select();

    if (!error && data) {
      categories.push({
        id: data[0].id,
        name: formData.get("name")?.toString() || "",
        user: userData?.id || "",
      });
      setCategoryData(categories);

      // router.refresh()
      setShowAddCategory(false);
    }
  };

  return (
    <div className="flex h-fit flex-col justify-center rounded-md bg-slate-100 px-3 py-5">
      <button
        onClick={() => setShowAddCategory(true)}
        className={`flex items-center justify-center gap-1 rounded-md border-[1.5px] border-dashed border-slate-400 bg-slate-100 px-3 py-2 hover:bg-slate-200
        ${showAddCategory ? "hidden" : ""}
        `}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add category
      </button>

      {showAddCategory && (
        <div className="flex flex-col">
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              required
              autoComplete="off"
              name="name"
              id="name"
              type="text"
              placeholder="Category name"
              className="w-full rounded border bg-white p-1  focus:outline-slate-400"
            />
            <div className="flex flex-row items-center justify-between gap-3">
              <button
                type="submit"
                className="my-1 rounded border border-blue-700 bg-purple-400 px-3 text-white hover:bg-purple-600"
              >
                Add
              </button>
              <CloseButton onClick={() => setShowAddCategory(false)} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
