import React from "react";
import Dropdown from 'react-dropdown';
// import 'components/styles/Dropdown.css';
import { useRecoilState } from 'recoil';
import EnvState from 'recoilStates/Addroad/EnvState';

const SelectEnv = () => {
    const [state, setState] = useRecoilState(EnvState); 
    const options = [
        "천변",
        "공원",
        "강변",
        "산",
        "호수",
        "길거리"
    ];
    const onSelect = (event) => {
        setState(event.value);
    };

    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <h3 id="subsubtitle">환경</h3>

            <Dropdown options={options} onChange={onSelect} value={state} placeholder='환경' />

        </div>
    )
};

export default SelectEnv;