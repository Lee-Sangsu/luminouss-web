import React from 'react';
import {useLocation} from 'react-router-dom';

const EditRoad = () => {
    const data = useLocation().state.item;
    return (
        <span>산책로 정보 수정 {console.log(data)}</span>
    )
};
export default EditRoad;