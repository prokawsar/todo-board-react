import Modal from "../../components/Modal";
import { DragEvent, useEffect, useState } from "react";
import AddTask from "./add-task";
import Card from "./card";
import { useCardBoardStore, useDataStore, useLoadingStore } from "../../store";
import CardDetails from "./card-details";
import { Category, Todo } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { supabase } from "../../db/supabase";

type Props = {
  category: Category;
  todoList?: Todo[] | null;
};

export default function CategoryBoard({ category, todoList }: Props) {
  const [showAddTask, setshowAddTask] = useState(false);
  const [todoData, setTodoData] = useState<Todo>();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  // const router = useRouter()
  const { setIsLoading } = useLoadingStore();
  const { cardBoard, setCardBoard } = useCardBoardStore();
  const { todos, setTodosData, deleteCategory } = useDataStore();

  useEffect(() => {
    const channel = supabase
      .channel("realtime todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        () => {
          // router.refresh()
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filtering todos here instead passing all todos
  const this_category_todos = todoList?.filter(
    (todo) => todo.category == category.id
  );

  const handleShowTodo = (data: any) => {
    setCardBoard(category.name);
    setTodoData(data);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setIsDraggingOver(false);
    const todo_id = e.dataTransfer.getData("card");
    const category_id = e.dataTransfer.getData("category_id");

    if (!todo_id || category.id.toString() == category_id) {
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from("todos")
      .update({
        category: category.id,
      })
      .eq("id", todo_id);
    if (error) {
      console.error(error);
    }

    // Updating local todos store
    const idx = todos.findIndex((todo) => todo.id == todo_id);
    todos[idx].category = category.id;
    setTodosData(todos);

    const { data } = await supabase.from("history").insert({
      todo: todo_id,
      from: category_id,
      to: category.id,
    });
    // router.refresh()
    setIsLoading(false);
  };

  const handleDeleteCategory = async () => {
    setIsLoading(true);
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", category.id);
    if (error) {
      console.error(error);
    }
    // Deleting from local store
    deleteCategory(category.id);
    // router.refresh()
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
      <div className="relative flex flex-col px-3 py-2">
        {!this_category_todos?.length && (
          <button
            onClick={handleDeleteCategory}
            className="absolute right-0 top-0 h-4 w-6"
          >
            <FontAwesomeIcon icon={faTrashAlt} size="xs" />
          </button>
        )}
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
