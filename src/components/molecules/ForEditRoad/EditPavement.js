import React from 'react';
import Dropdown from 'react-dropdown';

const EditPavement = ({pavementState, setPavementState, stairs, setStairState}) => {

    const [exceptState, setExceptState] = React.useState('');

    const options = [
        "시멘트",
        "흙, 돌",
        "나무 데크",
        "탄성 포장재(놀이터 바닥 포장재)",
        "기타"
    ];
    const onSelect = (event) => {
        setPavementState(event.value);
    };
    const onChange = ({target: {name, value}}) => {
        if (name === "except value"){ 
            setExceptState(value);
        } else if (name === 'stairs'){
            setStairState(value);
        }
    };

    const onClick = () => {
        setPavementState(exceptState);
    };
    return (
        <div id="edit-pavement-container">
            <h3 id="subsubtitle">길의 포장 재질 수정하기</h3>
            <div id="edit-pavement-container">
                <Dropdown options={options} onChange={onSelect} value={pavementState} placeholder="길 포장 재질" />
                {pavementState === options[4] ? <div style={{display:'flex', flexDirection:'row'}}>
                 <input onChange={onChange} id="pavement-input" name="except value" value={exceptState} placeholder='포장 재질을 직접 입력해주세요' /> 
                 <button id="submit-button" onClick={onClick}>submit</button> 
                 </div>: <></>}
            </div>      
            <h3 id="subtitle">계단의 특성 수정하기</h3>
            <textarea id="stair-input" type="text" name="stairs" onChange={onChange} value={stairs} placeholder="높이, 폭, 재질, 경사 등에 대한 특성을 기재해주세요." required /> 
        </div>
    )
};

export default EditPavement;