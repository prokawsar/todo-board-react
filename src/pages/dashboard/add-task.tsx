import { toast } from "sonner";
import CloseButton from "@/components/CloseButton";
import { addHistory, addTodo } from "@/db/supabase";
import { useDataStore, useLoadingStore, useUserStore } from "@/store/index";
import { Category } from "@/types/index";
import { FormEvent } from "react";

interface AddTaskProps {
  onClose: () => void;
  category: Category | undefined;
}

export default function AddTask({ category, onClose }: AddTaskProps) {
  const { userData } = useUserStore();
  const { setIsLoading } = useLoadingStore();
  const { todos, setTodosData } = useDataStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    if (!formData.get("title")) return;

    const payload = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      user: userData?.id || "",
      expire_at: formData.get("expire") || "",
      category: category?.id || "",
    };
    const { error, data } = await addTodo(payload);
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    await addHistory({ todo: data[0].id });

    todos.push({
      id: data[0].id,
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      user: userData?.id || "",
      expire_at: formData.get("expire")?.toString() || "",
      category: category?.id || -1,
    });

    toast.success("Todo added successfully");
    setTodosData(todos);
    onClose();
    setIsLoading(false);
  };

  const today = new Date();
  today.setDate(today.getDate() + 3);
  const defaultDate = today.toISOString().slice(0, 10);

  return (
    <div className="relative space-y-6 rounded-md bg-white p-4 ">
      <h2 className="text-xl text-black">
        Add new task{" "}
        <small className="text-xs text-slate-600">{category?.name}</small>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-3">
          <label>Title</label>
          <input
            autoFocus
            required
            autoComplete="off"
            name="title"
            type="text"
            placeholder="Task title"
            className="w-full rounded  border p-2  focus:outline-slate-400"
          />
          <label>Description</label>

          <textarea
            required
            autoComplete="off"
            name="description"
            placeholder="Task description"
            className="w-full rounded  border p-2  focus:outline-slate-400"
          />
          <label>Expire date</label>

          <input
            required
            autoComplete="off"
            name="expire"
            type="date"
            defaultValue={defaultDate}
            className="w-full rounded border p-2  focus:outline-slate-400"
          />
          <button
            type="submit"
            className="my-1 rounded-md border text-gray-200 bg-purple-500 p-2 hover:bg-purple-600  hover:text-white"
          >
            Add
          </button>
        </div>
      </form>
      <CloseButton onClick={onClose} styles="absolute right-1 -top-5" />
    </div>
  );
}
