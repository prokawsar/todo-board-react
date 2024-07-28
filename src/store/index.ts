import { Category, Todo } from "@/types/";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
};
export interface UserState {
  userData: User | null;
  setUser: (param: any) => void;
}

type UserPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>
) => StateCreator<UserState>;

export const useUserStore = create<UserState>(
  (persist as UserPersist)(
    (set) => ({
      userData: null,
      setUser: (value: any) => set(() => ({ userData: value })),
    }),
    {
      name: "user-data",
    }
  )
);

interface LoaderState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoaderState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

interface cardDetailsState {
  cardBoard: string;
  setCardBoard: (cardBoard: string) => void;
}

export const useCardBoardStore = create<cardDetailsState>()((set) => ({
  cardBoard: "",
  setCardBoard: (cardBoard: string) => set({ cardBoard: cardBoard }),
}));

interface dataState {
  todos: Todo[];
  categories: Category[];
  setTodosData: (todos: Todo[]) => void;
  deleteTodoLocal: (id: string) => void;
  setCategoryData: (todos: Category[]) => void;
  deleteCategoryLocal: (id: number) => void;
}

export const useDataStore = create<dataState>()((set) => ({
  todos: [],
  categories: [],
  setTodosData: (todos: Todo[]) => set({ todos: todos }),
  deleteTodoLocal: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id != id),
    }));
  },
  setCategoryData: (categories: Category[]) => set({ categories: categories }),
  deleteCategoryLocal: (id: number) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id != id),
    }));
  },
}));
