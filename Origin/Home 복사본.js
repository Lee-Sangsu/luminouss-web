import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "components/styles/Home.css"
import firebase from "global/fbase";

const Home  = ({ isLoggedIn }) => {
    //prop 바뀌면 리렌더링 isLoggedIn state 바뀜

    const history = useHistory();
    //login 안 된 경우, 로그인 필요합니다 알러트 띄우기
    const onClick = (event) => {
        event.preventDefault();
        if (isLoggedIn){
            history.push('/add-road-info');
        } else {
            window.alert("산책로 정보를 추가하려면 로그인이 필요합니다.");
            history.push('sign-in');
        }
    };
    
    const [arr, setArr]= useState([]);

    const getWalkRoadInfo = async () => {
            const res = await firebase.firestore().collection('WalkRoad').get()
    
            res.forEach((doc) => {
                const arrObj = {
                    ...doc.data(),
                    id: doc.id,
                };
                setArr((prev) => [arrObj, ...prev]);
            });
    };
     
    // 화면 켜질때 딱 한번만 array에 담는걸 어떻게 할까.. 
    useEffect(() => {
        getWalkRoadInfo();
    }, [])
 
    return (
        <>
            <div className="mainContainer">
                <h1 className="mainTitle">
                    시각장애인의 눈과 발이 되어주세요.
                </h1>
                <h3 className="explanation">
                    {`산책로 정보를 입력하시면, 
여가활동이 어려운 시각장애인에게
다양하고 편안한 산책 경험을 제공할 수 있습니다.`}
                </h3>

                <div className="linkBox">
                    <div className="addWalkway_text">산책로 정보 추가하기</div>
                    <Link to="/add-road-info" className="addWalkway" onClick={onClick}>
                        +
                    </Link>
                </div>
                {/* {screen.availHeight} */}


                <div id="container">
            <div className="introduction">
                <img className="team-name" src={require("images/titles/luminouss.png").default} alt='루미너스'></img>
                <h3 className="team-vision">{`시각장애인의 
                산책 한걸음이,
                자립 한걸음으로.`}</h3>
                <pre className="team-vision-mean">
{`루미너스는 '어둠 속에서 빛나는'이라는 뜻을 가지고 있는 영어 단어입니다.
어둠 속에서 빛이 나듯이, 시각장애인이 보는 세상이
더 밝아지기를 원한다는 비전을 가지고 있습니다.`}
                </pre>
            </div>
            <div className="logo-image">
                <img src={ require('images/심볼로고.png').default} alt='루미너스 로고'/>
            </div>
            <div className="problem-tit">
                <img className="prob-tit" src={require("images/titles/problem.png").default} alt='문제' />
                <img className="prob-pic" src={require("images/backgrounds/problem-back.jpg").default} alt='배경 사진' />
            </div>
            <div className="problem-body">
                <pre className="team-problem">{`
  시각장애인들은 산책을 즐겨하지만, 산책로의 환경 때문에 그들이 불편함을 겪고
있다는 것을 알게 되었습니다. 저희가 확인한 바로는, 이 문제가 발생하는 이유는 
산책로에 안전펜스, 유도블럭, 점자표지판 등 보조시설의 부재 때문이었습니다. 이로
인해 시각장애인들이 남산의 산책로에만 모이는 '쏠림 현상'이 발생한다는 것을 알
게 되었습니다. 그래서 저희는 '시각장애인의 불편한 산책 경험'을 해결하려 합니다.
                `}</pre>
            </div>
            <div className="solution-tit">
                <img className="sol-tit" src={require("images/titles/solution.png").default} alt='솔루션'/>
                <img className="sol-pic" src={require("images/backgrounds/solution-back.jpg").default} alt='배경 사진'/>
            </div>
            <div className="solution-body">
                <div className="solution-body-wrap">
                    <img className="image-space" src={require("images/AppUI.png").default} alt='앱 화면' />
                    <div className="solution-body-text is-flex">
                        <img src={require("images/word-mark-korean.png").default} alt='워크 위드'></img>
                        <div className="explaining-wrap">
                            <pre>
 {`산책로의 인프라가 시각장애인들에게 불편하다는 것을 발견했고, 이로 인해 서울의
시각장애인들이 한 군데의 산책로에만 모이는 쏠림 현상이 발생한다는 것을 알게
되었습니다. 이러한 현상을 방지하기 위해 제작된 '워크위드(Walk With)'는 시각장
애인들에게 다양한 산책로에 대한 정보를 제공하고, 산책중에 실시간으로 장애물과
주변 시설을 알려주어 시각장애인의 불편한 산책 경험을 개선할 것입니다.`}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>



                {arr ? arr.map((data) => <div key={data.id} style={{
                    marginTop:"20px",
                    marginBottom:"30px"
                }}>
                    <h4>{data.roadName}</h4>
                </div> ):<h5>산책로 정보 불러오는 중..</h5>}
                
            </div>
        </>
    );
};

export default Home;