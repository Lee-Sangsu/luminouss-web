import React from 'react';
import SmallCircle from "components/atoms/SmallCircle";

const Subject = ({id, circleColor, circleId, text}) => {
    return (
        <h2 id={id}><SmallCircle size={window.innerWidth > 500 ? '35px':'15px' } color={circleColor} id={circleId} />{text}</h2>
    )
};

export default Subject;