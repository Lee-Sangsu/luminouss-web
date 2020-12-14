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
        <div style={{
            display:'flex',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column'
        }}>
            <h3>계단 특성</h3>
            <input style={{
                width:'40%',
                height:'30%'
            }} type="text" onChange={onChange} value={stairs} required /> 
        </div>
    )
};

export default Fstairs;