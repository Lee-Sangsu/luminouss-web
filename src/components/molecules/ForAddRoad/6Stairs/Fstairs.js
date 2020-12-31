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
            <h3>계단의 특성(높이, 폭, 재질, 경사 등) 입력해주세요</h3>
            <input style={{
                width:'40%',
                height:'30%'
            }} type="text" onChange={onChange} value={stairs} placeholder="" required /> 
        </div>
    )
};

export default Fstairs;