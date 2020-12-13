import React from 'react';
import StairsState from 'recoilStates/Addroad/StairsState';
import { useRecoilState } from 'recoil';


const Fstairs = () => {
    const [stairs, setStairs] = useRecoilState(StairsState);

    const onChange = (event) => {
        event.preventDefault();
        setStairs(event.target.value);
    }
    return (
        <>
            <h3>계단 특성</h3>
            <input type="text" onChange={onChange} value={stairs} required /> 
        </>
    )
};

export default Fstairs;