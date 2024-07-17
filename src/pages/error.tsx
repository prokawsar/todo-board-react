import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <div className="items-center  flex w-full flex-1 flex-col justify-center gap-2">
        <p className="text-red-600">Error ! Not found</p>
        <Link to={"/"}>Return Home</Link>
      </div>
    </div>
  );
}
