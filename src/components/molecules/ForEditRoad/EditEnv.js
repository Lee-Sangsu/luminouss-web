import React from 'react';
import Dropdown from 'react-dropdown';

const EditEnv = ({envState, setEnvState, length, setLength}) => {
    const options = [
        "천변",
        "공원",
        "강변",
        "산",
        "호수",
        "길거리"
    ];
    const onSelect = (event) => {
        setEnvState(event.value);
    };
    const onChange = (event) => {
        event.preventDefault();
        setLength(event.target.value);
    }
    return (
        <div style={window.innerWidth <500 ? {display:'flex', width:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}:{}}>
            <h2 id="subsubtitle">환경</h2>
            <Dropdown options={options} onChange={onSelect} value={envState} placeholder='환경' />
            <h3 id="subsubtitle">산책로의 전체 길이</h3>
            <input id="number-input" type="number" name="road-length" onChange={onChange} value={length} placeholder="산책로의 전체 길이를 입력해주세요" required /> km
        </div>
    )
};

export default EditEnv;