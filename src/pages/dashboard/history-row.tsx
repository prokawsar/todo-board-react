import { useDataStore } from "@/store/index";
import { History, Todo } from "@/types/index";
import { niceDate } from "@/utils/date";

type DataProp = {
  history: History;
  todo: Todo;
};

export default function HistoryRow({ history, todo }: DataProp) {
  const { categories } = useDataStore();
  let categoryMap: { [key: number]: string } = {};

  if (categories.length) {
    categories.forEach((category) => {
      categoryMap[category.id] = category.name;
    });
  }

  return (
    <div className="text-sm">
      <p>
        {!history.from && !history.to && !history.updated_at
          ? `Created ticket ${todo.title} on `
          : ""}
        {history.from && history.to
          ? `Card has been moved from ${categoryMap[history.from]} to ${
              categoryMap[history.to]
            } on `
          : ""}
        {history.updated_at ? `Ticket Updated on ` : ""}

        {niceDate(history.created_at, false, true)}
      </p>
    </div>
  );
}
