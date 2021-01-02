import React from 'react';
import { Link } from 'react-router-dom';
import './LinkToAddRoad.css';

const AddRoadLink = () => {

    return (
        <Link to="/add-road-info" style={{
            textDecoration: 'unset',
            color: 'black',
            height: '30px'
        }}>
            <div id="link-to-add-road">
                <span style={{
                    fontStyle:'normal',
                    fontWeight:'bold',
                    fontSize:'18px',
                    lineHeight:'20px',
                    marginRight: '10px'

                }}>산책로 정보 추가하기</span>
                <span>화살표</span>
            </div>
        </Link>
    )
}

export default AddRoadLink;