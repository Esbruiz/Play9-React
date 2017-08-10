import React from 'react';

const ReDraw = (props) => {
    return (
        <div className="redraw">
            <button className="btn btn-warning" type="button" onClick={props.reDrawGame}
                    disabled={props.redrawCount === 0}>
                <i className="fa fa-refresh"></i> {props.redrawCount}
            </button>
        </div>);
};

export default ReDraw;