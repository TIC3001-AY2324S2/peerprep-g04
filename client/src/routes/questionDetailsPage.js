import React from "react";
import { useGetQuestionById } from "../hooks/api/question/useGetQuestionById";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetQuestionById({
    id: id,
  });
  const code = "console.log('Code Mirror!');";

  return (
    <div className="w-full h-full">
      <div className="flex flex-row p-8">
        {!isLoading ? (
          <div className="w-1/2 min-w-xl m-2">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.data.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {data.data.description}
              </p>
            </Card>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="w-1/2 min-w-xl m-2" style={{ height: "500px" }}>
          <CodeMirror value={code} height="50vh" theme={vscodeDark} />
        </div>
      </div>
    </div>
  );
}
