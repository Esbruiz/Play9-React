import React from 'react';
import ReDraw from './ReDraw';

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button onClick={props.acceptAnswer} className="btn btn-success" type="button"><i
                className="fa fa-check"></i></button>
            break;

        case false:
            button = <button className="btn btn-danger"><i className="fa fa-times"></i></button>
            break;

        default:
            button = <button className="btn" type="button" onClick={props.checkAnswer}
                             disabled={props.selectedNumbers.length === 0}>=</button>
            break;
    }
    return (<div className="col-xs-4">
        <div className="col-xs-12">
            {button}
        </div>

        <div className="col-xs-12">
        <ReDraw reDrawGame={props.reDrawGame} redrawCount={props.redrawCount}/>
        </div>
    </div>);
};

export default Button;