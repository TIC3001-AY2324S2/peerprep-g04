import React, { useState, useRef, useEffect } from "react";
import { Button } from "flowbite-react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import io from "socket.io-client";

const CollaborationEditor = ({ roomKey = "" }) => {
  const [userCode, setUserCode] = useState("// Type your code here");
  const [codeResult, setCodeResult] = useState("");
  const [room, setRoom] = useState(roomKey);
  const [joinedRoom, setJoinedRoom] = useState(false);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io.connect(
      `${process.env.REACT_APP_COLLABORATION_API_URL}`
    );

    const roomToJoin = room !== "" ? room : "default_room";

    if (socket.current) {
      socket.current.emit("join_room", roomToJoin);
      socket.current.on("receive_code", (data) => {
        setUserCode(data.code);
      });
    }
    setJoinedRoom(true);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [room]);

  const handleEditorChange = (value) => {
    setUserCode(value);
    if (socket.current) {
      socket.current.emit("send_code", { code: value, room: room });
    }
  };

  const leaveRoom = () => {
    if (socket.current) {
      socket.current.emit("leave_room", room);
      socket.current.off("send_code");
      socket.current.off("receive_code");
    }
    setJoinedRoom(false);
    alert(`Left room: ${room}`);
  };

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
      <pre>{room}</pre>
      <CodeMirror
        style={{ fontSize: "12px" }}
        value={userCode}
        height="50vh"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
        onChange={handleEditorChange}
      />
      <div className="flex flex-row gap-2 justify-end">
        {joinedRoom && (
          <Button onClick={leaveRoom} className="mt-2">
            Leave room
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

export default CollaborationEditor;
