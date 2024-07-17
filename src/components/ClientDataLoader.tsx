"use client";
import { supabase } from "../db/supabase";
import { useDataStore } from "../store";
import { Category, Todo } from "../types/types";
import { useEffect } from "react";

export default function ClientDataLoader() {
  const { setCategoryData, setTodosData } = useDataStore();

  const dataCategories = supabase.from("categories").select();
  const dataTodos = supabase.from("todos").select();
  useEffect(() => {
    dataCategories.then((categories) => {
      setCategoryData(categories.data as Category[]);
    });

    dataTodos.then((todos) => {
      setTodosData(todos.data as Todo[]);
    });
  }, []);
  return <></>;
}
