import React, { useState, useRef } from "react";
import { Button } from "flowbite-react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = () => {
  const [userCode, setUserCode] = useState("// Type your code here");
  const [codeResult, setCodeResult] = useState("");
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

  const executeCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const output = eval(userCode); // Execute the current userCode
      console.log(output);
      // Check if output is undefined before calling toString
      const result = output !== undefined ? output.toString() : "No output";
      setCodeResult(result);
    } catch (error) {
      console.error("Error executing code: ", error);
      setCodeResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="overlay rounded-md overflow-show w-full h-full shadow-4xl">
      <CodeMirror
        style={{ fontSize: "12px" }}
        value={userCode}
        height="50vh"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
        onChange={handleEditorChange}
      />
      <Button onClick={executeCode} className="mt-2">
        Run Code
      </Button>{" "}
      <pre className="mt-2">Output: {codeResult}</pre>
    </div>
  );
};

export default CodeEditor;
