import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "flowbite-react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

const CodeEditor = () => {
  const [userCode, setUserCode] = useState("// Type your code here");
  const [codeResult, setCodeResult] = useState("");
  const editorRef = useRef(null);
  const handleEditorChange = (value) => {
    setUserCode(value); // Update userCode with the current content of the editor
  };

  // const handleEditorDidMount = (editor, monaco) => {
  //   editorRef.current = editor; // Assuming `editor` is defined in the component scope

  //   // Initialize Yjs document
  //   const doc = new Y.Doc();
  //   const provider = new WebrtcProvider("test-room", doc); //room1 room2...
  //   const type = doc.getText("monaco"); // value our doc is showing

  //   // binding
  //   const binding = new MonacoBinding(
  //     type,
  //     editorRef.current.getModel(),
  //     new Set([editorRef.current]),
  //     provider.awareness
  //   );
  // };

  // const executeCode = () => {
  //   try {
  //     // eslint-disable-next-line no-eval
  //     const output = eval(userCode); // Execute the current userCode
  //     console.log(output);
  //     // Check if output is undefined before calling toString
  //     const result = output !== undefined ? output.toString() : "No output";
  //     setCodeResult(result);
  //   } catch (error) {
  //     console.error("Error executing code: ", error);
  //     setCodeResult(`Error: ${error.message}`);
  //   }
  // };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="50vh"
        width="90%"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={userCode}
        onChange={handleEditorChange}
        // onMount={handleEditorDidMount}
      />
      {/* <Button onClick={executeCode} className="mt-2">
        Run Code
      </Button>{" "}
      <pre className="mt-2">Output: {codeResult}</pre> */}
    </div>
  );
};

export default CodeEditor;
