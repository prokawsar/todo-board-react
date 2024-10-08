import AuthButton from "./AuthButton";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-slate-600/10">
      <div className="flex w-full max-w-7xl items-center justify-between p-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-slate-600">Todo Board</h1>
        </Link>
        <div className="flex flex-row items-center gap-2">{<AuthButton />}</div>
      </div>
    </nav>
  );
}
