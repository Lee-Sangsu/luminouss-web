import React from 'react';
import { Link } from 'react-router-dom';
import 'components/styles/WatchRoads.css';

const RoadNameItem = ({ item }) => {

    return (
        <div id="road-box">
            <Link id='road-watch' to={{pathname:`/road/item?id=${item.id}`, state:{
                item:item
            }}}>
                <h2 id="road-box-name">{item.road_name}</h2>
            </Link>
            
            <Link id="road-edit" to={{ pathname:`/road-edit/item?id=${item.id}`, state:{
                item: item
            }}}>
                <img id="road-edit-img" src={require('images/pencil.png').default} alt="산책로 정보 수정하기" />
            </Link>
        </div>
    )
};

export default RoadNameItem;