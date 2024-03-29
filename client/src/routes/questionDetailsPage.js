import React from "react";
import { useGetQuestionById } from "../hooks/api/question/useGetQuestionById";
import { useParams } from "react-router-dom";

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetQuestionById({
    id: id,
  });
  return (
    <div>
      <h1>Question Details Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
