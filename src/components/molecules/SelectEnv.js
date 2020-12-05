import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useRecoilState } from 'recoil';
import EnvState from 'recoilStates/EnvState';

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
        <>
            <h3>산책로 환경</h3>
            <div style={{
                width:'200px'
            }}>
                <Dropdown className='road-env' options={options} onChange={onSelect} value={state} placeholder='환경' />
            </div>
        </>
    )
};

export default SelectEnv;