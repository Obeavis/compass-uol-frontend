import { createContext, useReducer, useMemo } from "react";

type Action = { type: "LOADING"; payload: boolean };

type Context = {
  state: Store;
  dispatch: React.Dispatch<Action>;
};

type Store = {
  loading: boolean;
};

interface Props {
  children: React.ReactNode;
}

export const GlobalContext = createContext<Context>({} as Context);

const initialState = {
  loading: false,
};

const reducer = (state: Store, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING":
      return { ...state, loading: payload };

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<Store, Action>>(
    reducer,
    initialState
  );
  const store = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export const GlobalConsumer = GlobalContext.Consumer;
