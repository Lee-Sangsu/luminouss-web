import React, { useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import AddressState from 'recoilStates/AddressState';

const InputAddress = () => {
    const [address, selectAddress] = useState('');
    const setAddress = useSetRecoilState(AddressState);
    const detailAddress = useRecoilValue(AddressState);

    var options = [
        "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"
    ];
    options.sort();
    const onSelect = (event) => {
        selectAddress(event.value);
    };

    const onChange = (event) => {
        const {
            target: {
                name, value
            }
        } = event;
        if (name === "세부 주소") {
            setAddress({
                addressOption: address,
                detailedAddress: value
            });
        }
    };

    // const addressDetail = detailAddress.detailedAddress

    return (
        <>
            <Dropdown options={options} onChange={onSelect} value={address} placeholder="Select an option" />
            <input name="세부 주소" value="fuck" onChange={onChange} placeholder="세부 주소를 작성해주세용" required/>
        </>
    )
};

export default InputAddress;