import React from 'react';

const Answer = (props) => {
    return (<div className="col-xs-3">
        {props.selectedNumbers.map((number, i) =>
            <span
                onClick={() => props.unselectNumber(number)}
                key={i}>{number}
  </span>)}
    </div>);
};

export default Answer;