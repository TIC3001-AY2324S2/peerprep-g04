import React from "react";
import { useGetQuestionById } from "../hooks/api/question/useGetQuestionById";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/editor/codeEditor";
import Markdown from "react-markdown";

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetQuestionById({
    id: id,
  });

  return (
    <div className="w-full h-full" style={{ width: "90%" }}>
      <div className="flex flex-row p-8 h-full">
        {!isLoading ? (
          <div className="w-1/2 m-2">
            <section className="h-full block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.data.title}
              </h5>
              <Markdown>{data.data.description}</Markdown>
            </section>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="w-1/2 m-2">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}
