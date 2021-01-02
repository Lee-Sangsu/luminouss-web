import React from "react";
import Circle from 'components/atoms/Circle';
import MsgContainer from "components/molecules/MsgContainer";
import GlobalNav from "global/GlobalNav";

const NewHome = () => {
    React.useEffect(() => {
        document.getElementById("nav").style.display= 'none';
    }, [])
    return (
        <div style={{height:'900px'}}>
            <GlobalNav isFirstPage={true} />
            <MsgContainer />
            <Circle id="circle1" color='rgba(41, 117, 61, 1)' left='-82px' top='-69px' />
            <Circle id="circle2" color='rgba(41, 117, 61, 1)' left='426px' top='264px' />
            <Circle id="circle3" color='rgba(41, 117, 61, 1)' left='1038px' top='124px' />
            <Circle id="circle4" color='rgba(41, 117, 61, 1)' left='1140px' top='715px' />
            <Circle id="circle5" color='rgba(41, 117, 61, 1)' left='20px' top='807px' />
        </div>
    )

};

export default NewHome