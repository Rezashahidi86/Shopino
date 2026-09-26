import { useEffect, useState } from "react";
const useInterval = (duration, start = false) => {
  const [startInterval, setStartInterval] = useState(start);
  const [remainingTime, setRemainingTime] = useState(duration);
  useEffect(() => {
    if (!startInterval) return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          setStartInterval(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startInterval]);
  const formatter = (remainingTime) => {
    const min = Math.floor(remainingTime / 60);
    const second = String(remainingTime % 60);
    return `${min}:${second.padStart(2, 0)}`;
  };
  return [remainingTime, startInterval, formatter];
};
export default useInterval;
