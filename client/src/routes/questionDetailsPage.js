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

  // Function to split description based on keyword
  const splitDescription = (description) => {
    const keywords = ['input:', 'e.g.', 'E.g.', 'Input:', 'Example:', 'example:'];
    let index = -1;
    let keywordFound = '';

    // Find the index of the first keyword occurring in the description
    for (const kw of keywords) {
      const kwIndex = description.indexOf(kw);
      if (kwIndex !== -1 && (index === -1 || kwIndex < index)) {
        index = kwIndex;
        keywordFound = kw;
      }
    }

    if (index !== -1) {
      // Extracting the first and second halves based on the found keyword
      let firstHalf = description.substring(0, index).trim();
      let secondHalf = description.substring(index + keywordFound.length).trim();
      return [firstHalf, secondHalf];
    }

    // If no keyword found, return original description
    return [description, ''];
  };

  // Render the description
  const renderDescription = (description) => {
    let [firstHalf, secondHalf] = splitDescription(description);
    if (firstHalf.endsWith(',')) {
      firstHalf = firstHalf.slice(0, -1);
      firstHalf = firstHalf + '.';
    }

    const answerKeywords = ['output:', 'Output:', 'Answer:', 'answer:'];

    let answerKeywordFound = false;
    let indexOfAnsKw;
    let thirdHalf;
    let ansKw;

    if (secondHalf) {
      for (let i = 0; i < answerKeywords.length; i++) {
        if (secondHalf.includes(answerKeywords[i])) {
          answerKeywordFound = true;
          indexOfAnsKw = secondHalf.indexOf(answerKeywords[i]);
          ansKw = answerKeywords[i];
          break;
        }
      }
    }

    if (answerKeywordFound) {
      thirdHalf = secondHalf.substring(indexOfAnsKw + ansKw.length).trim();
      secondHalf = secondHalf.substring(0, indexOfAnsKw).trim();
    }

    console.log("First Half:", firstHalf);
    console.log("Second Half:", secondHalf);
    console.log("Third Half:", thirdHalf);

    return (
      <div>
        <p>{firstHalf}</p>
        <br></br>
        {secondHalf && <p><strong>Input: </strong><br></br>{secondHalf}</p>}
        <br></br>
        {thirdHalf && <p><strong>Output: </strong><br></br>{thirdHalf}</p>}
      </div>
    );
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
              {markdownVisible && renderDescription(data.data.description)}
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
