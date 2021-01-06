// ["선택 안함", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"]

import React from 'react';
import firebase from "global/fbase";
import RoadNameItem from 'components/molecules/ForWatchRoads/RoadNameItem';
import { Link, useHistory } from 'react-router-dom';
import GlobalNav from 'global/GlobalNav';
import Subject from 'components/molecules/Subject';
import Footer from 'components/molecules/ForHome/Footer';
import swal from 'sweetalert';

const WatchRoads = () => {
    const [roadNames, setRoadNames] = React.useState([]);

    const getWalkRoadInfo = async () => {
        try{
            const resRef = await firebase.firestore().collection('WalkRoad').orderBy('road_name').limit(7);
            (
                await resRef.get()).forEach((doc) => {
                const arrObj = {
                    ...doc.data(),
                    id: doc.id
                };
                setRoadNames((prev) => [arrObj, ...prev]);
            })
        } catch(e){console.log(e);}

    };

     const history = useHistory();

    const checkLogin = (event) => {
        event.preventDefault();
        if (window.localStorage.getItem('user')){
            history.push('/add-road-info');
        } else {
            swal("산책로 정보를 추가하려면 로그인이 필요합니다.");
            history.push('/sign-in');
        }
    }
     
    // 화면 켜질때 딱 한번만 array에 담는걸 어떻게 할까.. 
    React.useEffect(() => {
        getWalkRoadInfo();
    }, [])

    return (
    <div id="road-entire">
        <GlobalNav isNotHome={true} isFirstPage={false} />
        {/* <h1>산책로 정보</h1> */}
        <Subject id='roads-info' circleColor='rgba(255, 193, 7, 1)' text="산책로 정보" />
        <div id="road-container">
            <div id="new-road-box" >
                <Link to="/add-road-info" onClick={checkLogin} id="road-watch">
                    <h2 id="road-box-name">새로운 산책로 등록</h2>
                </Link>
            </div>
    {roadNames ? roadNames.map((data) => 
        <RoadNameItem key={data.id} item={data} />
        ): <div style={{display:'block', backgroundColor:'#efefef', height:window.innerHeight, width:window.innerWidth}}>산책로 정보 불러오는 중..</div>}
    </div>
    <Footer />

    </div>)


};

export default WatchRoads;