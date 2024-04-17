import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const Stopwatch = ({ onTimeReached, targetTime }) => {
  const [time, setTime] = useState(0);
  const hasReachedTime = useRef(false); // Add this ref

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        if (targetTime && newTime === targetTime) {
          clearInterval(intervalId);
          if (onTimeReached && !hasReachedTime.current) {
            hasReachedTime.current = true; // Set the ref to true
            onTimeReached();
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTime, onTimeReached]);

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(time / 60)}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  };

  return (
    <div>
      <h1>Elapsed Time: {formatTime(time)}</h1>
    </div>
  );
};
