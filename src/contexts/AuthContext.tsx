import React, { useReducer, useEffect, createContext, useMemo } from "react";
import { useAuth } from "hooks/useAuth";

type Action = { type: "IS_LOGGED"; payload: boolean };

type Context = {
  state: Store;
  dispatch: React.Dispatch<Action>;
};

type Store = {
  isLogged: boolean;
};

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<Context>({} as Context);

const initialState = {
  isLogged: !!localStorage.getItem("isLogged"),
};

const reducer = (state: Store, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "IS_LOGGED":
      return {
        ...state,
        isLogged: payload,
      };
    default:
      return state;
  }
};

const verifyUserLogged = async (
  isLogged: boolean,
  dispatch: Function,
  logout: Function
) => {
  if (!isLogged) return;
  try {
    localStorage.setItem("isLogged", "true");
    dispatch({
      type: "IS_LOGGED",
      payload: true,
    });
  } catch {
    console.log('caiu aqui?');
    logout();
  }
};

export const AuthProvider = ({ children }: Props) => {
  const { logout } = useAuth();
  const [state, dispatch] = useReducer<React.Reducer<Store, Action>>(
    reducer,
    initialState
  );
  const store = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    verifyUserLogged(state.isLogged || initialState.isLogged, dispatch, logout);
  }, [state.isLogged]);

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const AuthConsumer = AuthContext.Consumer;
