import React from "react";
import {useRecoilValue} from 'recoil';
import AddressState from 'recoilStates/AddressState';

const InputAddress = () => {

    const setAddress = useRecoilValue(AddressState);
    
    return (
        <>
            <h5>{setAddress.address_name}</h5>
        </>
    )
};

export default InputAddress;