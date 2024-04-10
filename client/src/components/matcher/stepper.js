import React from "react";

export const Stepper = (props) => {
  const { currentStep } = props;
  return (
    <ol
      className={`flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse`}
    >
      <li
        className={`flex items-center ${
          currentStep === 0 ? "text-blue-600 dark:text-blue-500" : ""
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full ${
            currentStep === 0
              ? "border-blue-600 shrink-0 dark:border-blue-500"
              : ""
          }`}
        >
          1
        </span>
        Select a category
        <svg
          class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li
        className={`flex items-center ${
          currentStep === 1 ? "text-blue-600 dark:text-blue-500" : ""
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full ${
            currentStep === 1
              ? "border-blue-600 shrink-0 dark:border-blue-500"
              : ""
          }`}
        >
          2
        </span>
        Select difficulty
        <svg
          class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li
        className={`flex items-center ${
          currentStep === 2 ? "text-blue-600 dark:text-blue-500" : ""
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full ${
            currentStep === 2
              ? "border-blue-600 shrink-0 dark:border-blue-500"
              : ""
          }`}
        >
          3
        </span>
        Wait for match
      </li>
    </ol>
  );
};

export default Stepper;
