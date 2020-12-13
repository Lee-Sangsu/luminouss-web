import React, {useState} from "react";
import { useSetRecoilState } from 'recoil';
import ToiletState from 'recoilStates/Addroad/ToiletState';

const Grest = () => {
  const setToilet = useSetRecoilState(ToiletState);
  const [toiletNum, setToiletNum] = useState(0);

  const [bench, setBench] = useState(0);

  const onChange = (event) => {
    event.preventDefault();
    if (event.target.name==='toilet'){
      setToiletNum(event.target.value);
      setToilet(`${event.target.value}m 마다 하나씩 있습니다.`);
    } else if (event.target.name==="bench") {
      setBench(event.target.value);
    }
  };
 // 1씩 더해지게 해야겠다.
  return (
    <>
      <h4>산책로에 화장실은 얼마나 있었나요?</h4>
      <div id='toilet-input'>
        <input type="radio" value="no" onChange={setToilet('없음')} /> 없었음
        <input type="number" name="toilet" value={toiletNum} onChange={onChange} /> m 마다 하나씩 있었다.
      </div>
      <div id='bench-input'>
        <input type="radio" value="no" onChange={setToilet('없음')} /> 없었음
        <input type="number" name="bench" value={bench} onChange={onChange} /> m 마다 하나씩 있었다.
      </div>
      
    </>
  )
};

export default Grest;