import { Jumbotron } from "../components/common/Jumbotron";
import { Card, Carousel } from "flowbite-react";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import CodeEditor from "../components/editor/codeEditor";
import CollabCodeEditor from "../components/editor/collabCodeEditor";

export default function HomePage() {
  return (
    <div>
      <Jumbotron />
      <CollabCodeEditor />
    </div>
  );
}
