import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL || "",
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY || ""
);

export const addCategory = async ({
  name,
  user,
}: {
  name: string;
  user: string;
}) => {
  return await supabase
    .from("categories")
    .insert({
      name: name,
      user: user,
    })
    .select();
};

export const deleteCategory = async ({ id }: { id: number }) => {
  return await supabase.from("categories").delete().eq("id", id);
};

export const addTodo = async ({
  title,
  description,
  user,
  expire_at,
  category,
}: {
  title: FormDataEntryValue;
  description: FormDataEntryValue;
  user: string;
  expire_at: FormDataEntryValue;
  category: string | number;
}) => {
  return await supabase
    .from("todos")
    .insert({
      title,
      description,
      user,
      expire_at,
      category,
    })
    .select();
};

export const updateTodo = async (
  payload: {
    title: FormDataEntryValue;
    description: FormDataEntryValue;
    expire_at: FormDataEntryValue;
  },
  id: string
) => {
  return await supabase.from("todos").update(payload).eq("id", id);
};

export const updateTodosCategory = async (
  payload: {
    category: number;
  },
  id: string
) => await supabase.from("todos").update(payload).eq("id", id);

export const addHistory = async ({ todo }: { todo: string }) => {
  return await supabase.from("history").insert({
    todo: todo,
    from: null,
    to: null,
  });
};

export const updateHistory = async ({
  todo,
  from,
  to,
  updated_at,
}: {
  todo: string;
  from?: string;
  to?: number;
  updated_at?: Date;
}) => {
  return await supabase.from("history").insert({
    todo: todo,
    from: from || null,
    to: to || null,
    updated_at: updated_at || null,
  });
};
