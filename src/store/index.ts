import { Category, Todo } from "@/types/types";
import { create } from "zustand";

export type User = {
  id: string;
  email: string;
};
export interface UserState {
  userData: User | null;
  setUser: (param: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUser: (value: any) => set(() => ({ userData: value })),
}));

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
  deleteTodo: (id: string) => void;
  setCategoryData: (todos: Category[]) => void;
  deleteCategory: (id: number) => void;
}

export const useDataStore = create<dataState>()((set) => ({
  todos: [],
  categories: [],
  setTodosData: (todos: Todo[]) => set({ todos: todos }),
  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id != id),
    }));
  },
  setCategoryData: (categories: Category[]) => set({ categories: categories }),
  deleteCategory: (id: number) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id != id),
    }));
  },
}));
