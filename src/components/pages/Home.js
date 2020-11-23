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
            window.alert("Login required");
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
                    문제 설명...
                </h3>

                <div className="linkBox">
                    <div className="addWalkway_text">산책로 정보 추가하기</div>
                    <Link to="/add-road-info" className="addWalkway" onClick={onClick}>
                        +
                    </Link>
                </div>
                {arr ? arr.map((data) => <div key={data.id}>
                    <h4>{data.roadName}</h4>
                </div> ):<h5>산책로 정보 불러오는 중..</h5>}
                
            </div>
        </>
    );
};

export default Home;