import { useDataStore } from "../../store";
import CategoryBoard from "./category-board";
import AddCategory from "./add-category";

export default function BoardList() {
  const { categories, todos } = useDataStore();

  return (
    <>
      {categories?.map((category) => (
        <CategoryBoard category={category} todoList={todos} key={category.id} />
      ))}
      <AddCategory />
    </>
  );
}
