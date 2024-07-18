import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../db/supabase";
import { User, useUserStore } from "../../store";
import { createContext, useEffect } from "react";
import { PROTECTED_ROUTES, UNAUTHENTICATE_ROUTES } from "../../utils/constants";

export const AuthContext = createContext<{ userData: User | null }>({
  userData: null,
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
    if (!userData) {
      const res = supabase.auth.getUser();
      res.then((response) => {
        if (response.data.user) {
          const { id, email } = response.data.user,
            user = { id, email };
          setUser(user);
        } else if (PROTECTED_ROUTES.includes(location.pathname)) {
          navigate("/login");
        }
      });
    } else {
      if (UNAUTHENTICATE_ROUTES.includes(location.pathname)) {
        navigate("/dashboard");
      }
    }
  }, [navigate, location, userData, setUser]);

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
}
