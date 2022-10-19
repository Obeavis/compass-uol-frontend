import { useState, useEffect } from "react";

const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, [time]);

  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default useClock;
