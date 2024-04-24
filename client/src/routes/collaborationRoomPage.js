import React, { useState } from "react";
import { useGetQuestionById } from "../hooks/api/question/useGetQuestionById";
import { useGetFindMatchByUserId } from "../hooks/api/match/useGetFindMatchByUserId";
import { useDeleteMatch } from "../hooks/api/match/useDeleteMatch";
import { useAuth } from "../components/common/AuthProvider";
import CollaborationEditor from "../components/editor/collaborationEditor";
import { Alert } from "flowbite-react";

export function renderMatchedBanner(currUser, userMatchData) {
  let matchedUser = "";

  const currUserNmae = currUser?.username;

  if (currUserNmae === userMatchData?.userOneName) {
    matchedUser = userMatchData?.userTwoName;
  } else {
    matchedUser = userMatchData?.userOneName;
  }

  return (
    <Alert color="success" onDismiss={() => alert("Alert dismissed!")}>
      <span className="font-medium">
        Successfully Matched with {matchedUser}!
      </span>{" "}
      Start coding with your partner now!
    </Alert>
  );
}

export default function CollaborationRoomPage(roomkey = "") {
  const { user } = useAuth();
  const userId = user?.userDetails._id;
  const { data: userMatchDetails, isLoading: isUserMatchDetailsLoading } =
    useGetFindMatchByUserId(user?.userDetails._id);
  const { mutateAsync: deleteMatch } = useDeleteMatch(userId);

  const { data, isLoading: isQuestionDataLoading } = useGetQuestionById({
    id: "662160050ae49a9c29a1a900", // change this to list of questions
  });

  const [markdownVisible, setMarkdownVisible] = useState(true);

  const toggleMakeCodeEditorEnlarged = () => {
    const firstDiv = document.getElementById("first");
    const secondDiv = document.getElementById("second");

    setMarkdownVisible(!markdownVisible);

    firstDiv.classList.toggle("w-1/2");
    firstDiv.classList.toggle("w-1/20");

    secondDiv.classList.toggle("w-1/2");
    secondDiv.classList.toggle("w-full");
  };

  // Function to split description based on keyword
  const splitDescription = (description) => {
    const keywords = [
      "input:",
      "e.g.",
      "E.g.",
      "Input:",
      "Example:",
      "example:",
    ];
    let index = -1;
    let keywordFound = "";

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
      let secondHalf = description
        .substring(index + keywordFound.length)
        .trim();
      return [firstHalf, secondHalf];
    }

    // If no keyword found, return original description
    return [description, ""];
  };

  // Render the description
  const renderDescription = (description) => {
    let [firstHalf, secondHalf] = splitDescription(description);
    if (firstHalf.endsWith(",")) {
      firstHalf = firstHalf.slice(0, -1);
      firstHalf = firstHalf + ".";
    }

    const answerKeywords = ["output:", "Output:", "Answer:", "answer:"];

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

    return (
      <div>
        <p>{firstHalf}</p>
        <br></br>
        {secondHalf && (
          <p>
            <strong>Input: </strong>
            <br></br>
            {secondHalf}
          </p>
        )}
        <br></br>
        {thirdHalf && (
          <p>
            <strong>Output: </strong>
            <br></br>
            {thirdHalf}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full" style={{ width: "90%" }}>
      {renderMatchedBanner(user?.userDetails, userMatchDetails?.data)}
      <div className="flex flex-row p-8 h-full">
        {!isQuestionDataLoading && !isUserMatchDetailsLoading ? (
          <div className="w-1/2 m-2" id="first">
            <section className="h-full block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <span
                className="flex justify-end cursor-pointer"
                onClick={toggleMakeCodeEditorEnlarged}
              >
                &lt;
              </span>
              {markdownVisible && (
                <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white flex justify-center">
                  Problem
                </h5>
              )}
              {markdownVisible && (
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
                  {data?.data?.title}
                </h5>
              )}
              {markdownVisible && (
                <hr className="my-2 border-gray-300 dark:border-gray-700" />
              )}
              {markdownVisible && renderDescription(data?.data?.description)}
            </section>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="w-1/2 m-2" id="second">
          <CollaborationEditor roomKey={userMatchDetails?.data.roomKey} />
        </div>
      </div>
    </div>
  );
}
