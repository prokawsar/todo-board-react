import { useDataStore, useUserStore } from "../../store";
import CategoryBoard from "./category-board";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthProvider";

export default function BoardList() {
  const { categories, todos } = useDataStore();
  const { userData } = useContext(AuthContext);
  // Restricted access category for users
  const this_users_category = categories?.filter(
    (category) => category.user === userData?.id
  );

  return (
    <>
      {!this_users_category && <p>Loading...</p>}
      {this_users_category?.map((category) => (
        <CategoryBoard category={category} todoList={todos} key={category.id} />
      ))}
    </>
  );
}
