import React from "react";
import BackgroundCircles from 'components/molecules/BackgroundCircles';
import MsgContainer from "components/molecules/MsgContainer";
import GlobalNav from "global/GlobalNav";
import onSoundBtnClick from 'functions/onSoundBtnClick';
import HomeThird from "components/organisms/HomeThird";
import "components/styles/Home.css";

const NewHome = () => {
    const [currentPage, setPage] = React.useState(0);
    const [isFirstPage, setIsFirstPage] = React.useState(true);

    const homePageUpChange = () => {
        const dCircles = document.getElementsByClassName("disappear-circles");
        const arrows = document.getElementsByClassName("arrow");
        if (currentPage === 1) {
            // 원래 처음 화면으로 돌리고, 이 버튼은 사라지게 하라
            document.getElementById("circle3").style.backgroundColor = 'rgba(41, 117, 61, 1)';
            document.getElementById("block-img").style.opacity = '0';
            document.getElementById("test").style.flex= 'none';
            document.getElementById("msg-container").style.top = '62%';
            [].forEach.call(dCircles, function (el) {
                el.style.opacity = '1';
            });
            setIsFirstPage(true);
            setPage(0);
        } else if (currentPage === 2) {
            //1페이지로 돌려
            document.getElementById("block-img").style.top =`${ window.innerHeight*0.55}px`;
            document.getElementById("msg-container").style.top = `100px`;
            document.getElementById("test").style.opacity = '0';
            document.getElementById("header-nav").style.zIndex = 6;
            // document.getElementById("arrows").style.zIndex = '8';
            [].forEach.call(arrows, function (el) {
                el.style.borderColor = 'black';
            });

            setPage(1);
        } else if (currentPage === 3) {
            // Appear Test View
            [].forEach.call(arrows, function (el) {
                el.style.borderColor = 'white';
            });
            document.getElementById("test").style.opacity = '1';
            document.getElementById("test").style.zIndex = '2';
            document.getElementById("entire-home").style.overflow = 'hidden';
            // document.getElementById("arrows").style.height = `${window.innerHeight}px`;
            document.getElementById("header-nav").style.zIndex = '-1';

            // Disappear Introduction & Footer
            document.getElementById("third-page").style.top = `${window.innerHeight}px`;
            
            setPage(2);
        }
    };

    const homePageDownChange = () => {
        const dCircles = document.getElementsByClassName("disappear-circles");
        const arrows = document.getElementsByClassName("arrow");
        if (currentPage === 0) {
            document.getElementById("circle3").style.backgroundColor = 'rgba(255, 193, 7, 1)';
            document.getElementById("msg-container").style.top = '100px';
            document.getElementById("our-logo").style.opacity = '0';
            document.getElementById("block-img").style.opacity = '1';
            document.getElementById("test").style.display = 'flex';

            [].forEach.call(dCircles, function (el) {
                el.style.opacity = '0';
            });
            setTimeout(() => {
                setIsFirstPage(false);
            }, 700);
            setPage(1);
        } else if (currentPage === 1) {
            //  Test View
            document.getElementById("block-img").style.top = `-45vh`;
            document.getElementById("msg-container").style.top = `-50vh`;
            document.getElementById("test").style.opacity = '1';
            document.getElementById("header-nav").style.zIndex = '-1';

            [].forEach.call(arrows, function (el) {
                el.style.borderColor = 'white';
            });
            setPage(2);
        } else if (currentPage === 2) {
            // DisAppear Test View
            document.getElementById("test").style.opacity = '0';
            document.getElementById("test").style.zIndex = '-3';
            document.getElementById("header-nav").style.zIndex = '6';
            // document.getElementById("arrows").style.zIndex = '8';
            // document.getElementById("arrows").style.height = '114px';
            // Appear Introduction & Footer
            [].forEach.call(arrows, function (el) {
                el.style.borderColor = 'black';
            });
            document.getElementById("third-page").style.top = '0';
            setPage(3);
        }
    };


    return (
        <div id="entire-home" style= {{
            height: window.innerHeight,
            width: window.innerWidth,
            overflow: 'hidden'
        }}>
            {/* <div id="arrows" style={{
                height: window.innerHeight
            }} > */}
               {isFirstPage? <i className="arrow up" style={{opacity:'0', cursor: 'unset'}} /> : 
                <i className="arrow up" onClick={homePageUpChange} /> 
               }
               {currentPage === 3 ? <span className="arrow down" onClick={homePageDownChange} style={{opacity:'0', cursor: 'unset'}} />  :
               <span className="arrow down" onClick={homePageDownChange} /> }
            {/* </div> */}

            <GlobalNav isFirstPage={isFirstPage} isNotHome={false} />
            {/* <div id="before-home" onClick={homePageChange} style={{width:window.innerWidth*0.7, height:window.innerHeight, background:'none', position:'fixed', zIndex:'2'}}> */}
                <MsgContainer />
                <BackgroundCircles />
                <img id="block-img" src={require('images/block-img.jpg').default} alt="유도블록 사진" style={{top:window.innerHeight*0.55}}></img>
            {/* </div> */}

                <div id="test">
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

                    <h5 id="down-arrow">테스트가 종료되었습니다</h5>
                </div>
                
                
                <HomeThird /> 
        </div>
    )

};

export default NewHome