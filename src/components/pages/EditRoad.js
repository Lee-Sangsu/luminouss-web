import React from 'react';
import {useLocation} from 'react-router-dom';
import RoadInfoView from 'components/molecules/ForWatchRoads/RoadInfoView';
import EditRoadInfo from 'components/molecules/EditRoadInfo';



const EditRoad = () => {
    const data = useLocation().state.item;

    return (
        <div id='edit-road'>
            <RoadInfoView data={data} />
            <EditRoadInfo data={data} />
        </div>
    )
};
export default EditRoad;