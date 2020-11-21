import React from "react";
import {useRecoilValue} from 'recoil';
import AddressState from 'recoilStates/AddressState';

const InputAddress = () => {

    const setAddress = useRecoilValue(AddressState);
    //isEmpty check 해서 state ''면 에러 배텅
    return (
        <>
            <h5>{setAddress.address_name}</h5>
        </>
    )
};

export default InputAddress;