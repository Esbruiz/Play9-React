import React from 'react';
const DoneFrame = (props) => {
    return (
        <div className="col-xs-12 text-center">
            <h3>{props.doneStatus}</h3>
            <button onClick={props.restartGame} className="btn btn-info">Play Again</button>
        </div>);
};

export default DoneFrame;