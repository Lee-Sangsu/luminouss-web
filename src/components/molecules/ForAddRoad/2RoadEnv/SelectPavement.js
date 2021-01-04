import React, { useState } from "react";
import Dropdown from 'react-dropdown';
import { useRecoilState } from 'recoil';
import PavementState from 'recoilStates/Addroad/PavementState';

const SelectPavement = () => {
    const [state, setState] = useRecoilState(PavementState); 
    const [exceptState, setExceptState] = useState('');

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
            setExceptState(value);
        } 
    };

    const onClick = () => {
        setState(exceptState);
    };

    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <h3 id="subsubtitle">포장재질</h3>
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
            }}>
                <Dropdown options={options} onChange={onSelect} value={state} placeholder="길 포장 재질" />
                {state === options[4] ? <div style={{display:'flex', flexDirection:'row'}}>
                 <input onChange={onChange} id="pavement-input" name="except value" value={exceptState} placeholder='포장 재질을 직접 입력해주세요' /> 
                 <button id="submit-button" onClick={onClick}>submit</button> 
                 </div>: <></>}
            </div>      
        </div>
    )
};

export default SelectPavement;