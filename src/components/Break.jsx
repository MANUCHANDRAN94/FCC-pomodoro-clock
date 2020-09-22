import moment from 'moment';
import React from "react";

const Break = (props) => {
 const {breakLength ,decBreakLengthByOneMinute, incBreakLengthByOneMinute} = props;
  const breakLengthInMinutes = moment.duration(breakLength , 's').minutes();
  return (
    <div>
      <p id="break-label">Break</p>
      <p id="break-length">{breakLengthInMinutes}</p>
      <button id="break-increment" onClick={incBreakLengthByOneMinute}>
        +
      </button>
      <button id="break-decrement" onClick={decBreakLengthByOneMinute}>
        -
      </button>
    </div>
  );
};

export default Break;
