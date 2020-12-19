// ["선택 안함", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"]

import React from 'react';
import firebase from "global/fbase";
import RoadNameItem from 'components/molecules/ForWatchRoads/RoadNameItem';

const WatchRoads = () => {
    const [roadNames, setRoadNames] = React.useState([]);

    const getWalkRoadInfo = async () => {
        try{
            const resRef = await firebase.firestore().collection('WalkRoad').orderBy('road_name').limit(6);
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
     
    // 화면 켜질때 딱 한번만 array에 담는걸 어떻게 할까.. 
    React.useEffect(() => {
        getWalkRoadInfo();
    }, [])

    return (
    <div id="road-entire">
        <h1>산책로 정보</h1>
        <div id="road-container">
    {roadNames ? roadNames.map((data) => 
        <RoadNameItem key={data.id} item={data} />
        ): <div style={{display:'block', backgroundColor:'#efefef', height:window.innerHeight, width:window.innerWidth}}>산책로 정보 불러오는 중..</div>}
    </div>

    </div>)

};

export default WatchRoads;