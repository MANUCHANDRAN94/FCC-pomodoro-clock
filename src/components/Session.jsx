import moment from 'moment';
import React from "react";

const Session = (props) => {
  const {sessionLength , incSessionLengthByOneMinute , decSessionLengthByOneMinute}= props;
  const sessionLengthInMinutes = moment.duration(sessionLength, "s").minutes();
  
  return (
    <div>
      <p id="session-label">Session</p>
      <p id="session-length">{sessionLengthInMinutes}</p>
      <button id="session-increment" onClick={incSessionLengthByOneMinute}>
        +
      </button>
      <button id="session-decrement" onClick={decSessionLengthByOneMinute}>
        -
      </button>
    </div>
  );
};

export default Session;
