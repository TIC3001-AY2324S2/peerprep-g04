import React, { useState, useEffect } from 'react';

export const Stopwatch = ({ onTimeReached, targetTime }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => {
        // Only call onTimeReached if targetTime is defined and it's the correct time
        if (targetTime && time === targetTime - 1) {
          if (onTimeReached) {
            onTimeReached();
          }
        }
        return time + 1;
      });
    }, 1000);

    // Clean up the interval on component unmount
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

