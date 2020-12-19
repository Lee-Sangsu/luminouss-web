import React from "react";
import {useLocation} from 'react-router-dom';
import RoadInfoView from 'components/molecules/ForWatchRoads/RoadInfoView';

const WatchRoad = () => {
    // const search = useLocation().search;
    // const name = new URLSearchParams(search).get('id');
    const data = useLocation().state.item;
    return (
        <div id="watch-road">
            <RoadInfoView data={data} />
        </div>
    )
};

export default WatchRoad;

