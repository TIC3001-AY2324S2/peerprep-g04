import React, { useState, useEffect } from 'react';

export const Stopwatch = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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

