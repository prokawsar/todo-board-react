import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../db/supabase";
import { UserState, useUserStore } from "../../store";
import { createContext, useEffect } from "react";

export const AuthContext = createContext<UserState>({
  userData: null,
  setUser: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const res = supabase.auth.getUser();
    res.then((response) => {
      if (response.data.user) {
        setUser(response.data.user);
        console.log(location.pathname);
        if (["/login", "/signup", "/"].includes(location.pathname)) {
          navigate("/dashboard");
        }
      } else {
        if (["/dashboard"].includes(location.pathname)) {
          navigate("/login");
        }
      }
    });
  }, [setUser, navigate, location]);

  return (
    <AuthContext.Provider value={{ userData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
