import React from "react";
import {useLocation} from 'react-router-dom';

const WatchRoad = () => {
    // const search = useLocation().search;
    // const name = new URLSearchParams(search).get('id');
    const data = useLocation().state.item;
    return (
        <div style={{backgroundColor:'black', width:'100%', height:'100%'}}> 
            {console.log(data)}
        </div>
    )
};

export default WatchRoad;

