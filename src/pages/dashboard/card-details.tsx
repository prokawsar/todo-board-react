import CloseButton from "../../components/CloseButton";
import { useDataStore, useLoadingStore } from "../../store";
import { History, Todo } from "../../types/types";
import { faSave, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import HistoryRow from "./history-row";
import { supabase, updateHistory, updateTodo } from "../../db/supabase";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  data: Todo;
  setShowDrawer: Function;
};

export default function CardDetails({ data, setShowDrawer }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [todoHistory, setHistory] = useState<any>();
  const [todoData, setTodoData] = useState<Todo>(data);
  const { setIsLoading } = useLoadingStore();
  const { todos, setTodosData, deleteTodoLocal } = useDataStore();
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Todo>({
    defaultValues: data,
  });

  useEffect(() => {
    setTodoData(data);
    supabase
      .from("history")
      .select()
      .eq("todo", data.id)
      .then(({ data }) => {
        if (data && data.length) {
          setHistory(data);
        }
      });
  }, [data]);

  const updateTodoStore = ({
    title,
    description,
    expire_at,
  }: {
    title: string;
    description: string;
    expire_at: string;
  }) => {
    const idx = todos.findIndex((item) => item.id == data.id);
    todos[idx].title = title.toString();
    todos[idx].description = description.toString();
    todos[idx].expire_at = expire_at.toString();
    setTodosData(todos);
  };

  const updateDetails: SubmitHandler<Todo> = async (payload) => {
    if (!isDirty) {
      setShowDrawer();
      return;
    }

    setIsLoading(true);
    const { error } = await updateTodo(payload, data.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    await updateHistory({
      todo: data.id,
      updated_at: new Date(),
    });
    updateTodoStore(payload);
    setShowDrawer();
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    const { error } = await supabase.from("todos").delete().eq("id", data?.id);
    if (error) {
      toast.error(error.message);
      setShowDrawer();
      setIsLoading(false);
      return;
    }
    // Deleting from local store
    deleteTodoLocal(data?.id as string);
    setIsLoading(false);
  };

  return (
    data && (
      <div
        className={`fixed right-0 top-0 z-10 h-screen w-full border-l-[1.5px] border-gray-200 bg-gray-50 pt-8 transition-all sm:translate-x-0 md:w-96`}
        aria-label="sidebar"
      >
        <div className="relative h-full w-full overflow-y-auto px-3  pb-4">
          <div>
            <h5
              id="drawer-left-label"
              className="mb-4 inline-flex items-center text-lg font-semibold text-gray-500"
            >
              Task Details
            </h5>
            <CloseButton
              styles="absolute top-0 right-4"
              onClick={() => setShowDrawer(false)}
            />
          </div>
          {todoData && (
            <form onSubmit={handleSubmit(updateDetails)}>
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-slate-400"
                  placeholder="title"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows={4}
                  className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 focus:outline-slate-400"
                  placeholder="Description..."
                ></textarea>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="expire"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Expiration date
                </label>
                <input
                  type="date"
                  id="expire"
                  {...register("expire_at")}
                  className="block w-full  rounded-lg border p-2.5 text-sm text-gray-900 focus:outline-slate-400 "
                  required
                />
              </div>

              <p className="text-sm font-medium text-slate-800">History</p>
              {!todoHistory && (
                <p className="text-sm text-slate-600">History loading...</p>
              )}

              <div
                className={`${
                  todoHistory ? "flex" : "hidden"
                } animate-in mt-2 max-h-80 flex-col gap-2 overflow-y-auto bg-white rounded border p-2`}
              >
                {todoHistory &&
                  todoHistory
                    .sort((a: History, b: History) => a.id - b.id)
                    .map((history: History) => (
                      <HistoryRow
                        key={history.id}
                        history={history}
                        todo={data}
                      />
                    ))}
              </div>
              <div className="mt-5 flex justify-between">
                {deleteConfirm && (
                  <div className="flex flex-row items-center">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(false)}
                      className="w-auto rounded-bl-md rounded-tl-md border border-r-0 border-slate-500 px-3 py-1 hover:bg-slate-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete()}
                      className="flex items-center rounded-br-md rounded-tr-md border border-l-0 border-green-600 bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                    >
                      Confirm
                    </button>
                  </div>
                )}
                {!deleteConfirm && (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(true)}
                    className="flex w-auto items-center gap-1 rounded-md border border-red-500 px-3 py-1 text-red-500 hover:bg-slate-100"
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="xs"
                      className="text-red-500"
                    />
                    Delete
                  </button>
                )}

                <button
                  type="submit"
                  className="flex w-auto items-center gap-1 rounded-md border bg-purple-400 px-3 py-1 text-white hover:bg-purple-600"
                >
                  <FontAwesomeIcon icon={faSave} size="xs" />
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  );
}
