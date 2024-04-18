import React, { useState, useEffect } from "react";

export const Stopwatch = ({ onTimeReached, targetTime, stopwatchRunning }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!stopwatchRunning) {
            return; // If the stopwatch is not supposed to run, exit the function early
        }

        const intervalId = setInterval(() => {
            if (time + 1 === targetTime) {
                if (onTimeReached) {
                    onTimeReached();
                }
                clearInterval(intervalId); // Stop the timer after reaching the target time
            }
            setTime(time + 1);
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup function to clear interval on unmount
    }, [time, targetTime, onTimeReached, stopwatchRunning]);

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
