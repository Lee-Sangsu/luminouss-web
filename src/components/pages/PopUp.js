import React from 'react';

export const PopUp = () => {
    const [popUp, setPopUp] = React.useState(true);
    const [imgNum, setImgNum] = React.useState(2);

    React.useEffect(() => {
        const openPopUp = window.sessionStorage.getItem('popup');
        if (openPopUp === 'no') {
            setPopUp(false);
        }
    }, [])

    const closePopUp = () => {
        setPopUp(false);
    };
    const neverOpenPopUp = () => {
        setPopUp(false);
        window.sessionStorage.setItem('popup', 'no');
    };

    return (<div id="pop-up" style={{height: window.innerHeight}}>
        {/* modal */}
        {popUp ? <> 
        <div id="pop-up-background" />
        <div id="pop-up-container">
            <div id="close-btn-div">
                <button id="close-btn" onClick={closePopUp}>X</button>
            </div>
            <div id="pop-up-img-container">
                <img id="pop-up-img" style={imgNum === 2 ? {cursor:'e-resize'}: {cursor:'default'}} src={require(`images/popup${imgNum}.png`).default} alt="기프티콘 제공 종료 알림" onClick={() => setImgNum(1)} />
            </div>
            <div id="never-open-pop-up">
                <div>
                    <button id="never-open-btn" onClick={neverOpenPopUp}></button>
                    <label id="never-open">다시 열지 않음</label>
                </div>
            </div>
        </div> </>: <div style={{display:'none'}}></div>}
    </div>);
};