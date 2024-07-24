import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../db/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useDataStore, useLoadingStore, useUserStore } from "../store";

export default function AuthButton() {
  const navigate = useNavigate();
  // const { userData } = useContext(AuthContext);
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
  return userData?.id ? (
    <div className="flex items-center gap-4">
      Hey, {userData.email}!
      <button onClick={signOut}>
        <FontAwesomeIcon icon={faArrowRightToBracket} />
      </button>
    </div>
  ) : (
    <Link
      className="flex rounded-md border border-slate-500 px-3 py-2 no-underline hover:bg-slate-100"
      to="/login"
    >
      Login
    </Link>
  );
}
