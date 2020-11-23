import React, { useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const SelectPavement = () => {
    const [state, setState] = useState(''); // 이 친구도 리코일로 바꿔야 할까..?
    const [exceptValue, setExceptValue] = useState('');
    const options = [
        "시멘트",
        "흙, 돌",
        "나무 데크",
        "탄성 포장재(놀이터 바닥 포장재)",
        "기타"
    ];
    const onSelect = (event) => {
        setState(event.value);
    };
    const onChange = ({target: {name, value}}) => {
        if (name === "except value"){ 
            setExceptValue(value);
        } 
    };

    return (
        <>
            <h3> 포장재질 </h3>
            <div style={{
                width:'300px'
            }}>
                <Dropdown options={options} onChange={onSelect} value={state} placeholder="길 포장 재질" />
                {state === options[4] ? <input onChange={onChange} name="except value" value={exceptValue} placeholder='포장 재질을 직접 입력해주세요' /> : <></>}
            </div>      
        </>
    )
};

export default SelectPavement;