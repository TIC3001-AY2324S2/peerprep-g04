import React, { useState } from "react";
import { useGetQuestionById } from "../hooks/api/question/useGetQuestionById";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/editor/codeEditor";
import Markdown from "react-markdown";

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetQuestionById({
    id: id,
  });

  const [markdownVisible, setMarkdownVisible] = useState(true);

  const toggleMakeCodeEditorEnlarged = () => {
    const firstDiv = document.getElementById('first');
    const secondDiv = document.getElementById('second');

    setMarkdownVisible(!markdownVisible);

    firstDiv.classList.toggle('w-1/2');
    firstDiv.classList.toggle('w-1/20');

    secondDiv.classList.toggle('w-1/2');
    secondDiv.classList.toggle('w-full');
  };

  return (
    <div className="w-full h-full" style={{ width: "90%" }}>
      <div className="flex flex-row p-8 h-full">
        {!isLoading ? (
          <div className="w-1/2 m-2" id="first">
            <section className="h-full block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <span className="flex justify-end cursor-pointer" onClick={toggleMakeCodeEditorEnlarged}>&lt;</span>
              {markdownVisible && <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white flex justify-center">
                Problem
              </h5>}
              {markdownVisible && <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
                {data.data.title}
              </h5>}
              {markdownVisible && <hr className="my-2 border-gray-300 dark:border-gray-700" />}
              {markdownVisible && <Markdown>{data.data.description}</Markdown>}
            </section>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="w-1/2 m-2" id="second">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}
