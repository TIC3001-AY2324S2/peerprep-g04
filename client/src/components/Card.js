import { React } from "react";

export const Card = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        {props.children}
      </div>
    </div>
  );
};
