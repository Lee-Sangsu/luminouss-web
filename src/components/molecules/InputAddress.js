import React from "react";
import {useRecoilValue} from 'recoil';
import AddressState from 'recoilStates/AddressState';

const InputAddress = () => {

    const setAddress = useRecoilValue(AddressState);
    //isEmpty check 해서 state ''면 에러 배텅
    return (
        <div style={{
            marginTop:'30px',
            marginBottom:'30px'
        }}>
            <h3 id="road-head" style={{
            display: "none"
          }}>산책로 위치: </h3>
            <h5>{setAddress.address_name}</h5>
        </div>
    )
};

export default InputAddress;