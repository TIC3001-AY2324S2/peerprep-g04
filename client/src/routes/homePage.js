import { Jumbotron } from "../components/common/Jumbotron";
import { Card, Carousel } from "flowbite-react";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import CodeEditor from "../components/editor/codeEditor";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Jumbotron />
      <CodeEditor />
    </div>
  );
}
