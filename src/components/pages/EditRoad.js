import React from 'react';
import {useLocation} from 'react-router-dom';
import RoadInfoView from 'components/molecules/ForWatchRoads/RoadInfoView';
import EditRoadInfo from 'components/molecules/EditRoadInfo';
import GlobalNav from 'global/GlobalNav';


const EditRoad = () => {
    const data = useLocation().state.item;

    return (<>
        <GlobalNav isNotHome={true} isFirstPage={false} />
        <div id='edit-road'>
            <RoadInfoView isJustEdit={true} data={data} />
            <EditRoadInfo data={data} />
        </div>
    </>)
};
export default EditRoad;