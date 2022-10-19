import { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "contexts/GlobalContext";
import { useAuth } from "hooks/useAuth";

export const useSessionTimeOut = () => {
  const { dispatch } = useContext(GlobalContext);
  const [countdown, setCountdown] = useState(600);
  const { logout } = useAuth();

  const intervalref = useRef<number | null>(null);

  const clear = () => {
    if (intervalref.current) {
      window.clearInterval(intervalref.current);
      intervalref.current = null;
    }
  };

  useEffect(() => {
    intervalref.current = window.setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);
    return () => {
      if (intervalref.current !== null) {
        clear();
      }
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clear();
      logout();
      setInterval(() => {
        dispatch({ type: "LOADING", payload: false });
      }, 1000);
    }
  }, [countdown]);

  const resetCountDown = () => {
    setCountdown(600);
  };

  return {
    countdown,
    resetCountDown,
  };
};
