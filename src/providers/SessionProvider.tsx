import React, { useState, useEffect } from "react";
import { getToken } from "services/api/auth";
import { ILogin } from "../interfaces/login.interface";
import { AxiosResponse } from "axios";
import { dispatchEvent } from "@hooks/useEvent";

export const SessionContext = React.createContext({});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<AxiosResponse<any, any> | null>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<
    AxiosResponse<any, any> | boolean | null
  >(null);



  useEffect(() => {
    const session = localStorage.getItem("token");
    if (session) {
      setSession(JSON.parse(session));
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const login = async ({ email, password }: ILogin) => {
    try {
      const token = await getToken({ email, password });

      if (!token) {
        return;
      }
      setSession(token);
      setIsUserLoggedIn(true);
      localStorage.setItem("token", JSON.stringify(token));
    } catch (error: any) {
      console.log(error);

      const { data } = error.response;
      const payload = {
        severity: data.status,
        message: data.message,
        open: true,
      };
      dispatchEvent({ eventName: "snackbar", payload });
    }
  };

  const logout = () => {
    setSession(null);
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
  };

  document.addEventListener(
    "logout",
    function () {
        logout();
    },
    { once: true }
  );

  const context = {
    session,
    isUserLoggedIn,
    login,
    logout,
  };

  return (
    <SessionContext.Provider value={{ ...context }}>
      {children}
    </SessionContext.Provider>
  );
};
