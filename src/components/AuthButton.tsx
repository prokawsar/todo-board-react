import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { supabase } from "../db/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store";

export default function AuthButton() {
  const navigate = useNavigate();
  // const { userData } = useContext(AuthContext);
  const { userData, setUser } = useUserStore();

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
