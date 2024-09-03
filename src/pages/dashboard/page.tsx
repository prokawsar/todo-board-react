import { useDataStore, useLoadingStore } from "@store/index";
import BoardList from "./board-list";
import { useContext, useEffect } from "react";
import { supabase } from "@db/supabase";
import { Category, Todo } from "@/types/";
import { AuthContext } from "@components/context/AuthProvider";

export default function Dashboard() {
  const { setIsLoading } = useLoadingStore();
  const { setCategoryData, setTodosData } = useDataStore();
  const { userData } = useContext(AuthContext);

  document.title = "Dashboard";

  useEffect(() => {
    setIsLoading(true);

    const dataCategories = supabase
      .from("categories")
      .select()
      .eq("user", userData?.id);
    const dataTodos = supabase.from("todos").select().eq("user", userData?.id);

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
  }, [setIsLoading, setCategoryData, setTodosData, userData?.id]);

  return (
    <div className="flex w-full max-w-7xl flex-1 flex-col items-center">
      <div className="w-full bg-gradient-to-r from-transparent via-purple-700 to-transparent p-[1.5px] mb-2" />

      <div
        className={`grid h-[85vh] w-full auto-cols-[16rem] grid-flow-col gap-x-2 overflow-x-auto`}
      >
        <BoardList />
      </div>
    </div>
  );
}
