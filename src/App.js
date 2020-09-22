import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  const audioElement = useRef(null);
  const [sessionLength, setSessionLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [intervalId, setIntervalId] = useState(null);

  //change timeLeft when sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  //;isten to timeleft changes
  //changes to break or break to session
  useEffect(() => {
    //if timeleft is zero
    if (timeLeft === 0) {
      //play the audio
      audioElement.current.play();
      if (currentSessionType === "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft]);

  const decBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };
  const incBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    } else {
      setBreakLength(60 * 60);
    }
  };

  const decSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };
  const incSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(newSessionLength);
    } else {
      setSessionLength(60 * 60);
    }
  };

  const isStarted = intervalId !== null;

  const handleStartStopClick = () => {
    if (isStarted) {
      //if we are in started mode: we want to stop the timer - with clear interval
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 100);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load();
    //clear the timeout interval
    clearInterval(intervalId);
    //set the intervalId null
    setIntervalId(null);
    //set the session to 'Session
    setCurrentSessionType("Session");
    //reset the session length to 25 minutes
    setSessionLength(60 * 25);
    //reset the break length to 5 minutes
    setBreakLength(60 * 5);
    //reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 25);
  };
  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        decBreakLengthByOneMinute={decBreakLengthByOneMinute}
        incBreakLengthByOneMinute={incBreakLengthByOneMinute}
      />
      <TimeLeft
        handleStartStopClick={handleStartStopClick}
        timerLabel={currentSessionType}
        startStopButtonLabel={isStarted ? "Stop" : "Start"}
        timeLeft={timeLeft}
      />
      <Session
        sessionLength={sessionLength}
        decSessionLengthByOneMinute={decSessionLengthByOneMinute}
        incSessionLengthByOneMinute={incSessionLengthByOneMinute}
      />
      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>
      <audio ref={audioElement} id="beep">
        <source
          src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
