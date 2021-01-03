import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LinkToAddRoad.css';
import { useRecoilValue } from 'recoil';
import IsLoggedInState from 'recoilStates/IsLoggedInState';

const AddRoadLink = () => {
    const isLoggedIn = useRecoilValue(IsLoggedInState);
    const history = useHistory();

    const checkLogin = (event) => {
        event.preventDefault();
        if (isLoggedIn){
            history.push('/add-road-info');
        } else {
            window.alert("산책로 정보를 추가하려면 로그인이 필요합니다.");
            history.push('/sign-in');
        }
    }

    return (
        <Link to="/add-road-info" onClick={checkLogin} style={{
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