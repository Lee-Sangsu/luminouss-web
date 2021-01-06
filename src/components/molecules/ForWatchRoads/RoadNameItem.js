import React from 'react';
import { Link } from 'react-router-dom';
import 'components/styles/WatchRoads.css';
import EditRoadInfoState from 'recoilStates/EditRoadInfoState';
import {useSetRecoilState} from 'recoil';

const RoadNameItem = ({ item }) => {
    const init = useSetRecoilState(EditRoadInfoState);

    const initState = () => {
        init("");
    }; 

    return (<div id="road-item">
        <div id="road-box">
            <Link id='road-watch' to={{pathname:`/road/item?id=${item.id}`, state:{
                item:item
            }}}>
            </Link>
            
            <Link id="road-edit" onClick={initState} to={{ pathname:`/road-edit/item?id=${item.id}`, state:{
                item: item
            }}}>
                <img id="road-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" />
            </Link>
        </div>
        <h2 id="road-item-name">{item.road_name}</h2></div>
    )
};

export default RoadNameItem;