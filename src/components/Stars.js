import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
    return (
        <div className="col-xs-5">
            {_.range(props.numberOfStars).map(number => <i key={number} className="fa fa-star"></i>)}
        </div>);
};

export default Stars;