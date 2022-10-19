import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
export const useAuth = () => {
  const { dispatch } = useContext(AuthContext);
  const setIsLogged = (logged: boolean) => {
    localStorage.setItem("isLogged", logged.toString());
    dispatch({ type: "IS_LOGGED", payload: logged });
  };
  const setLogin = (login: string, password: string) => {
    setIsLogged(true);
    localStorage.setItem("login", login);
    localStorage.setItem("password", password);
  };

  const logout = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    dispatch({ type: "IS_LOGGED", payload: false });
  };

  return {
    setIsLogged,
    setLogin,
    logout,
  };
};
