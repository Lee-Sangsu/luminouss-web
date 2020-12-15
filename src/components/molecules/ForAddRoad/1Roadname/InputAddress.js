import React from "react";
import {useSetRecoilState} from 'recoil';
import AddressState from 'recoilStates/Addroad/AddressState';

const InputAddress = () => {

    const [address, setAddress] = useSetRecoilState(AddressState);


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
            }}>{address.address_name}</h5>
            <h5> {`산책로가 ${address.address_area} 외에 다른 행정 구역에 걸쳐져 있나요?`} </h5>
            <input type="text"  />
        </div>
    )
};

export default InputAddress;