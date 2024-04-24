import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'flowbite-react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { DeleteMatchModal } from '../matcher/DeleteMatchModal';
import { useAuth } from '../common/AuthProvider';
import { useGetFindMatchByUserId } from '../../hooks/api/match/useGetFindMatchByUserId';

const CollaborationEditor = () => {
  const [userCode, setUserCode] = useState('// Type your code here');
  const [codeResult, setCodeResult] = useState('');
  const [room, setRoom] = useState(() => localStorage.getItem('room'));
  const [isLoading, setIsLoading] = useState(true);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [openDeleteMatchModal, setOpenDeleteMatchModal] = useState(false);
  const { user } = useAuth();
  const userId = user?.userDetails._id;
  const { data: matchDetails, isLoading: isLoadingMatchDetails } =
    useGetFindMatchByUserId(user?.userDetails._id);

  const socket = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    socket.current = io.connect(
      `${process.env.REACT_APP_COLLABORATION_API_URL}`
    );

    if (socket.current) {
      socket.current.emit('join_room', room);
      socket.current.on('receive_code', (data) => {
        setUserCode(data.code);
      });
    }

    // Listen for 'user_left' or 'match_deleted' event
    socket.current.on('user_left', () => {
      alert(
        'Another user has left the room. You will be redirected to the home page.'
      );
      leaveRoom();
    });

    setJoinedRoom(true);
    setIsLoading(false);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [room]);

  const handleEditorChange = (value) => {
    setUserCode(value);
    if (socket.current) {
      socket.current.emit('send_code', { code: value, room: room });
    }
  };

  const leaveRoom = () => {
    if (socket.current) {
      socket.current.emit('leave_room', room);
      socket.current.off('send_code');
      socket.current.off('receive_code');
    }
    setJoinedRoom(false);
    localStorage.removeItem('room'); // Remove room from local storage
    navigate('/');
  };

  const executeCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const output = eval(userCode);
      const result = output !== undefined ? output.toString() : 'No output';
      setCodeResult(result);
    } catch (error) {
      console.error('Error executing code: ', error);
      setCodeResult(`Error: ${error.message}`);
    }
  };

  if (isLoading || room === undefined) {
    return <div>Loading...</div>; // Replace this with your spinner component
  }

  return (
    room !== undefined && (
      <div className="overlay rounded-md overflow-show w-full h-full shadow-4xl">
        <CodeMirror
          style={{ fontSize: '12px' }}
          value={userCode}
          height="50vh"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={handleEditorChange}
        />
        <div className="flex flex-row gap-2 justify-end">
          {joinedRoom && (
            <Button
              onClick={() => {
                setOpenDeleteMatchModal(true);
              }}
              className="mt-2"
            >
              Leave room
            </Button>
          )}
          <Button onClick={executeCode} className="mt-2">
            Run Code
          </Button>
        </div>
        <pre className="mt-2">Output: {codeResult}</pre>

        {openDeleteMatchModal && !isLoadingMatchDetails && (
          <DeleteMatchModal
            show={openDeleteMatchModal}
            match={matchDetails?.data}
            user={userId}
            setOpenDeleteMatchModal={setOpenDeleteMatchModal}
            leaveRoom={leaveRoom}
          />
        )}
      </div>
    )
  );
};

export default CollaborationEditor;
