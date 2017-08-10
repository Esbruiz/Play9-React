import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {

    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    };

    return (
        <div className="card text-center col-xs-12">
            <div>
                {Numbers.list.map((number) => <span onClick={() => props.onNumberSelect(number)}
                                                    className={numberClassName(number)} key={number}>{number}</span>)}
            </div>
        </div>
    );
};

Numbers.list = _.range(1, 10);

export default Numbers;