import React from 'react';
import onSoundBtnClick from 'functions/onSoundBtnClick';

export default ({ moveScroll, imgRef}) => {
    //ref={imgRef} 
    return (
        <div ref={imgRef} className="test">
                <div id="clova">
                    <img id="clova-img" src={require('images/CLOVA_dubbing_watermark_white.png').default} alt='클로바 더빙에서 제공된 음성입니다.' />
                </div>
                <div className="first-test-box">
                    <h4 id='first-h4'>
{`이곳을 눌러 
소리를 들어보세요 ->`
}</h4>    
                    <button id="first-sound-btn" onClick={onSoundBtnClick} />
                </div> 
                <div id="second-test-box">
                    <h4 id='second-h4'>
{`이곳을 눌러 
소리를 들어보세요 ->`
}</h4>    
                    <button id="second-sound-btn" onClick={onSoundBtnClick} />
                </div> 
                <div id="third-test-box">
                    <h4 id='third-h4'>
{`이곳을 눌러 
소리를 들어보세요 ->`
}</h4>    
                    <button id="third-sound-btn" onClick={onSoundBtnClick} />
                </div> 

                <h5 onClick={moveScroll} id="down-arrow">테스트가 종료되었습니다</h5>
            </div>
    )
};

