import React, { useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const SelectEnv = () => {
    const [state, setState] = useState(''); // 이 친구도 리코일로 바꿔야 할까..?
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
            <Dropdown options={options} onChange={onSelect} value={state} placeholder="Select an option" />
        </>
    )
};

export default SelectEnv;