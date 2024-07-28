import Modal from "@components/Modal";
import { DragEvent, useState } from "react";
import AddTask from "./add-task";
import Card from "./card";
import { useCardBoardStore, useDataStore, useLoadingStore } from "@store/index";
import CardDetails from "./card-details";
import { Category, Todo } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMultiply, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  deleteCategory,
  updateHistory,
  updateTodosCategory,
} from "../../db/supabase";
import { toast } from "sonner";

type Props = {
  category: Category;
  todoList?: Todo[] | null;
};

export default function CategoryBoard({ category, todoList }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showAddTask, setshowAddTask] = useState(false);
  const [todoData, setTodoData] = useState<Todo>();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { setIsLoading } = useLoadingStore();
  const { cardBoard, setCardBoard } = useCardBoardStore();
  const { todos, setTodosData, deleteCategoryLocal } = useDataStore();

  // Filtering todos here instead passing all todos
  const this_category_todos = todoList?.filter(
    (todo) => todo.category == category.id
  );

  const handleShowTodo = (data: Todo) => {
    setCardBoard(category.name);
    data.expire_at = new Date(data.expire_at)?.toISOString()?.substring(0, 10);
    setTodoData(data);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setIsDraggingOver(false);
    const todo_id = e.dataTransfer.getData("card");
    const category_id = e.dataTransfer.getData("category_id");

    if (!todo_id || category.id.toString() === category_id) {
      setIsLoading(false);
      return;
    }

    const { error } = await updateTodosCategory(
      { category: category.id },
      todo_id
    );
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // Updating local todos store
    const idx = todos.findIndex((todo) => todo.id == todo_id);
    todos[idx].category = category.id;
    setTodosData(todos);

    const payload = {
      todo: todo_id,
      from: category_id,
      to: category.id,
    };
    await updateHistory(payload);
    setIsLoading(false);
  };

  const handleDeleteCategory = async () => {
    setIsLoading(true);

    const { error } = await deleteCategory({ id: category.id });
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }
    // Deleting from local store
    deleteCategoryLocal(category.id);
    setIsLoading(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  return (
    <div
      onDrop={(e) => handleDrop(e)}
      onDragLeave={() => setIsDraggingOver(false)}
      onDragOver={(e) => handleDragOver(e)}
      className={`flex h-fit flex-col rounded-md bg-slate-100 ${
        isDraggingOver
          ? "border-2 border-dashed border-gray-400 bg-white bg-opacity-40"
          : ""
      }`}
    >
      <div className="relative flex flex-col px-3 py-2 pt-5">
        <div className="absolute p-1 right-0 top-1">
          {deleteConfirm && (
            <div className="flex flex-row items-center">
              <button
                type="button"
                onClick={() => setDeleteConfirm(false)}
                className="flex rounded-bl-md rounded-tl-md border border-r-0 border-slate-500 px-2 py-1 hover:bg-red-100"
              >
                <FontAwesomeIcon
                  icon={faMultiply}
                  size="xs"
                  className="text-red-500"
                />
              </button>

              <button
                type="button"
                onClick={handleDeleteCategory}
                className="flex items-center rounded-br-md rounded-tr-md border border-l-0 border-green-600 px-2 py-1 text-white hover:bg-green-100"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  size="xs"
                  className="text-green-500"
                />
              </button>
            </div>
          )}
          {!deleteConfirm && !this_category_todos?.length && (
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              className="flex w-auto items-center gap-1 rounded-md px-3 py-1 text-red-500 hover:bg-slate-100"
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="sm"
                className="text-red-500"
              />
            </button>
          )}
        </div>

        <p className="text-center text-xl font-bold">{category?.name}</p>

        {/* Task list */}
        <div className="flex flex-col gap-3">
          {this_category_todos?.map((todo) => (
            <Card
              onClick={() => handleShowTodo(todo)}
              key={todo.id}
              todo={todo}
            />
          ))}
        </div>
        <button
          onClick={() => setshowAddTask(true)}
          className={`mt-3 flex flex-row items-center justify-center gap-1 rounded-md border-[1.5px] border-dashed border-slate-400 bg-slate-100 px-3 py-2 hover:bg-slate-200
        `}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add task
        </button>
      </div>

      {showAddTask && (
        <Modal onClickBackdrop={() => setshowAddTask(false)}>
          <AddTask category={category} onClose={() => setshowAddTask(false)} />
        </Modal>
      )}

      {cardBoard === category.name && todoData && (
        <CardDetails data={todoData} setShowDrawer={() => setCardBoard("")} />
      )}
    </div>
  );
}
