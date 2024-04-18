import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const Stopwatch = ({ onTimeReached, targetTime, stopwatchRunning }) => {
    const [time, setTime] = useState(0);
    const hasReachedTime = useRef(false); // Use to ensure onTimeReached is called only once

    useEffect(() => {
        if (!stopwatchRunning) {
            return; // If the stopwatch is not supposed to run, exit the effect early
        }

        const intervalId = setInterval(() => {
            setTime((prevTime) => {
                const newTime = prevTime + 1;
                // Check if the target time has been reached
                if (targetTime && newTime === targetTime) {
                    clearInterval(intervalId); // Stop the interval
                    if (onTimeReached && !hasReachedTime.current) {
                        hasReachedTime.current = true; // Mark as reached
                        onTimeReached(); // Call the passed function
                    }
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [targetTime, onTimeReached, stopwatchRunning]);

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
