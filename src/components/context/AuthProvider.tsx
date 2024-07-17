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
  const location = useLocation()
  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(user);
        if (user) {
          if(['/login', '/signup'].includes(location.pathname)){
            navigate('/dashboard');
          }
          setUser(user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkUser();
    // const res = supabase.auth.getUser()
    // res.then((response) => {
    //   if (response.data.user) {
    //     setUser(response.data.user)
    //   }
    // })
  }, [setUser, navigate, location]);
  console.log(userData);
  return (
    <AuthContext.Provider value={{ userData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
