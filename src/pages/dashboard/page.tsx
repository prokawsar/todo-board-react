import { useDataStore, useLoadingStore } from "../../store";
import BoardList from "./board-list";
import { useEffect } from "react";
import { supabase } from "../../db/supabase";
import { Category, Todo } from "../../types/types";

export default function Dashboard() {
  const { setIsLoading } = useLoadingStore();
  const { setCategoryData, setTodosData } = useDataStore();

  document.title = "Dashboard";

  useEffect(() => {
    setIsLoading(true);
    const dataCategories = supabase.from("categories").select();
    const dataTodos = supabase.from("todos").select();

    Promise.all([dataCategories, dataTodos])
      .then((values) => {
        setCategoryData(values[0].data as Category[]);
        setTodosData(values[1].data as Todo[]);

        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="flex w-full max-w-7xl flex-1 flex-col items-center">
      <div className="w-full bg-gradient-to-r from-transparent via-purple-700 to-transparent p-[1px]" />

      <div
        className={`grid h-[85vh] w-full auto-cols-[16rem] grid-flow-col gap-x-2 overflow-x-auto`}
      >
        <BoardList />
      </div>
    </div>
  );
}
