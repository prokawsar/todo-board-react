import { useDataStore } from "@/store/index";
import CategoryBoard from "./category-board";
import AddCategory from "./add-category";
import CardDetails from "./card-details";
import { Todo } from "@/types/index";
import { useState } from "react";

export default function BoardList() {
  const { categories, todos } = useDataStore();
  const [todoData, setTodoData] = useState<Todo>();
  const [showDetails, setShowDetails] = useState(false);

  const handleShowTodo = (data: Todo) => {
    setShowDetails(true);
    data.expire_at = new Date(data.expire_at)?.toISOString()?.substring(0, 10);
    setTodoData(data);
  };

  return (
    <>
      {categories?.map((category) => (
        <CategoryBoard
          onShowTodo={handleShowTodo}
          category={category}
          todoList={todos}
          key={category.id}
        />
      ))}
      <CardDetails
        showDetails={showDetails}
        data={todoData}
        setShowDrawer={() => setShowDetails(false)}
      />
      <AddCategory />
    </>
  );
}
