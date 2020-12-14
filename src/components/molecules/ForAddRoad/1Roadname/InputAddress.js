import React from "react";
import {useRecoilValue} from 'recoil';
import AddressState from 'recoilStates/Addroad/AddressState';

const InputAddress = () => {

    const setAddress = useRecoilValue(AddressState);
    //isEmpty check 해서 state ''면 에러 배텅
    return (
        <div id='road-res-entire' style={{
            marginTop:'30px',
            marginBottom:'30px',
            display:'none'
        }}>
            <h3 id="road-head" style={{
            display: "none"
          }}>산책로 위치: </h3>
            <h5 id='road-address' style={{
                display: "none"
            }}>{setAddress.address_name}</h5>
        </div>
    )
};

export default InputAddress;