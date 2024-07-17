"use client";

import { supabase } from "../../db/supabase";
import { UserState, useUserStore } from "../../store";
import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
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
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
