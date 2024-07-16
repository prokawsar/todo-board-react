import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { supabase } from "../db/supabase";
// import { useUserStore } from "@/store";

export default function AuthButton() {
  // const { userData } = useContext(AuthContext)
  // console.log({ userData })
  // const { userData } = useUserStore();
  const signOut = () => {
    // supabase.auth.signOut()
    // return redirect('/')
  };
  return <a href="/login">Login</a>;
  // return userData ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {userData.email}!
  //     <form onSubmit={signOut}>
  //       <button type="submit">
  //         <FontAwesomeIcon icon={faArrowRightToBracket} />
  //       </button>
  //     </form>
  //   </div>
  // ) : (
  //   <a
  //     href="/login"
  //     className="flex rounded-md border border-slate-500 px-3 py-2 no-underline hover:bg-slate-100"
  //   >
  //     Login
  //   </a>
  // );
}
