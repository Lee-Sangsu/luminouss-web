import React from 'react';
import SmallCircle from "components/atoms/SmallCircle";

const Subject = ({id, circleColor, circleId, text}) => {
    return (
        <h2 id={id}><SmallCircle color={circleColor} id={circleId} />{text}</h2>
    )
};

export default Subject;