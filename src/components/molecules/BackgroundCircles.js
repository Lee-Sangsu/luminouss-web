import React from "react";
import Circle from 'components/atoms/Circle';

const BackgroundCircles = () => {
    return (<>
        <Circle id="circle1" className="disappear-circles" color='rgba(41, 117, 61, 1)' left='-82px' top='-69px' />
        <Circle id="circle2" className="disappear-circles" color='rgba(41, 117, 61, 1)' left='426px' top='264px' />
        <Circle id="circle3" color='rgba(41, 117, 61, 1)' left='1038px' top='124px' />
        <Circle id="circle4" className="disappear-circles" color='rgba(41, 117, 61, 1)' left='1140px' top='715px' />
        <Circle id="circle5" className="disappear-circles" color='rgba(41, 117, 61, 1)' left='20px' top='807px' />
    </>);
};

export default BackgroundCircles;