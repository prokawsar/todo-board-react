import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@db/supabase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDataStore, useLoadingStore, useUserStore } from "@store/index";

export default function AuthButton() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setIsLoading } = useLoadingStore();
  const { userData, setUser } = useUserStore();
  const { setCategoryData, setTodosData } = useDataStore();

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setCategoryData([]);
    setTodosData([]);
    setIsLoading(false);
    navigate("/login");
  };

  if (userData?.id) {
    return (
      <div className="flex items-center gap-4">
        Hey, {userData.email}!
        <button onClick={signOut}>
          <FontAwesomeIcon icon={faArrowRightToBracket} />
        </button>
      </div>
    );
  }

  const isHomeRoute = () => {
    const showHome = ["/login", "/signup"].includes(pathname);
    if (showHome) return ["/", "Home"];
    else return ["/login", "Login"];
  };

  return (
    <Link
      className="flex rounded-md border border-slate-500 px-3 py-2 no-underline hover:bg-slate-100"
      to={isHomeRoute()[0]}
    >
      {isHomeRoute()[1]}
    </Link>
  );
}
