import React, { useState, useRef, useEffect } from "react";
import { Button } from "flowbite-react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import io from "socket.io-client";

const CollabCodeEditor = () => {
  const [userCode, setUserCode] = useState("// Type your code here");
  const [codeResult, setCodeResult] = useState("");
  const [room, setRoom] = useState("test");
  const [joinedRoom, setJoinedRoom] = useState(false);

  const handleEditorChange = (value) => {
    setUserCode(value);
    socket.emit("send_code", { code: value, room: room });
  };

  const socket = useRef(io.connect("http://localhost:3004")).current;

  const joinRoom = () => {
    socket.emit("join_room", "test");
    setJoinedRoom(true);
    alert("Joined room: test");
  };

  const leaveRoom = () => {
    socket.emit("leave_room", "test");
    setJoinedRoom(false);
    alert("Left room: test");
  };

  useEffect(() => {
    socket.on("receive_code", (data) => {
      setUserCode(data.code);
    });
  }, [socket]);

  const executeCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const output = eval(userCode);
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
      <div className="flex flex-row gap-2 justify-end">
        {joinedRoom ? (
          <Button onClick={leaveRoom} className="mt-2">
            Leave test room
          </Button>
        ) : (
          <Button onClick={joinRoom} className="mt-2">
            Join test room
          </Button>
        )}
        <Button onClick={executeCode} className="mt-2">
          Run Code
        </Button>
      </div>
      <pre className="mt-2">Output: {codeResult}</pre>
    </div>
  );
};

export default CollabCodeEditor;
