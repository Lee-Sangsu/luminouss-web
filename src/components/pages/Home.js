import React, {useRef, useState} from "react";
import { useHistory } from "react-router-dom";
import "components/styles/Home.css"
import FirstIntroduction from 'components/molecules/ForHome/FirstIntroduction';
import Test from 'components/molecules/ForHome/Test';
import SecondIntroduction from 'components/molecules/ForHome/SecondIntroduction';
import ReactPageScroller from 'react-page-scroller';

const Home  = ({ isLoggedIn }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChane = number => {
        setCurrentPage(number);
        if (number === 1) {
            document.getElementById('nav').style.display = 'none';
        } else if (number === 0 || number === 2 || number === 3)  {
            document.getElementById('nav').style.display = 'block';
        }
        console.log(number);
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
            history.push('sign-in');
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

    // 앱 체험하기 부분 useEffect 말고 react-scroll로 구현
    
    return (
        <>
            <ReactPageScroller pageOnChange={handlePageChane} customPageNumber={currentPage}>
                <FirstIntroduction onRoadInfoClick={onRoadInfoClick} firstmoveScroll={firstmoveScroll} />
                
                <Test moveScroll={moveScroll} imgRef={imgRef} />

                <SecondIntroduction divRef={divRef} onRoadInfoClick={onRoadInfoClick} />
            </ReactPageScroller>
            
            
        </>
    );
};

export default Home;