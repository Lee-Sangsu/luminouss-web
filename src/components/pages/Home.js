import React, {useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import "components/styles/Home.css"
import FirstIntroduction from 'components/molecules/ForHome/FirstIntroduction';
import Test from 'components/molecules/ForHome/Test';
import SecondIntroduction from 'components/molecules/ForHome/SecondIntroduction';
import ReactPageScroller from 'react-page-scroller';
import { useRecoilValue } from 'recoil';
import IsLoggedInState from 'recoilStates/IsLoggedInState';


const Home  = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const isLoggedIn = useRecoilValue(IsLoggedInState);

    const handlePageChange = number =>() => {
        setCurrentPage(number);
    };

    //prop 바뀌면 리렌더링 isLoggedIn state 바뀜
    const history = useHistory();

    //login 안 된 경우, 로그인 필요합니다 알러트 띄우기
    const onRoadInfoClick = (event) => {
        event.preventDefault();
        if (isLoggedIn){
            history.push('/add-road-info');
        } else {
            window.alert("산책로 정보를 추가하려면 로그인이 필요합니다.");
            history.push('/sign-in');
        }
    };

    // 아래로 내려가는 버튼 눌렀을 때
    const divRef = useRef(null);
    const imgRef = useRef();

    const moveScroll = () => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const firstmoveScroll = () => {
        imgRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <ReactPageScroller pageOnChange={handlePageChange} customPageNumber={currentPage}>
                <FirstIntroduction onRoadInfoClick={onRoadInfoClick} firstmoveScroll={firstmoveScroll} />
                
                <Test moveScroll={moveScroll} imgRef={imgRef} />

                <SecondIntroduction divRef={divRef} onRoadInfoClick={onRoadInfoClick} />
            </ReactPageScroller>
            
            
        </>
    );
};

export default Home;