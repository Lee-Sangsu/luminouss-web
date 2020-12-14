import React, {useState} from "react";
import { useEffect } from "react";
import { useSetRecoilState } from 'recoil';
import ToiletState from 'recoilStates/Addroad/ToiletState';
import 'components/styles/Addroad/Grest.css';
import BenchState from 'recoilStates/Addroad/BenchState';

const Grest = () => {
  const setToilet = useSetRecoilState(ToiletState);
  const setBench = useSetRecoilState(BenchState);
  const [toiletNum, setToiletNum] = useState(0);
  const [bench, setBenchNum] = useState(0);
  const [toiletIsChecked, setToiletChecked] = useState(false);
  const [benchIsChecked, setBenchChecked] = useState(false);

  const onChange = (event) => {
    // event.preventDefault();
    if (event.target.name==='toilet'){
      setToiletNum(event.target.value);
      setToilet(`${event.target.value}m 마다 하나씩 있습니다.`);
    } else if (event.target.name==="bench") {
      setBenchNum(event.target.value);
      setBench(`${event.target.value}m 마다 하나씩 있습니다.`);
    } else if (event.target.name==="no-toilet"){
      setToiletChecked(!toiletIsChecked);
      setToilet('없었다.');
    } else if (event.target.name==="no-bench"){
      setBenchChecked(!benchIsChecked);
      setBench('없었다.');
    }
  }; 

  useEffect(() => {
    if (toiletIsChecked) {
      document.getElementById('toilet-m').style.display = 'none';
    } else if (toiletIsChecked === false) {
      document.getElementById('toilet-m').style.display = 'block';
    }
    if (benchIsChecked) {
      document.getElementById('bench-m').style.display = 'none';
    } else if (benchIsChecked === false) {
      document.getElementById('bench-m').style.display = 'block';
    } 
  }, [toiletIsChecked, benchIsChecked])
 // 10m씩 더해지게 해야겠다.
  return (
    <div id='rest'>
      <h3 id='toilet'>산책로에 화장실은 얼마나 있었나요?</h3>
      <div id='toilet-input'>
        <input type="checkbox" name="no-toilet" checked={toiletIsChecked} onChange={onChange} /> 없었다.
        <label id="toilet-m">
           <input type="number" name="toilet" value={toiletNum} onChange={onChange} /> m 마다 하나씩 있었다.  
        </label>
      </div>
      <h3 id='bench'>산책로에 벤치와 같은 휴식 공간은 얼마나 있었나요?</h3>
      <div id='bench-input'>
      <input type="checkbox" name="no-bench" checked={benchIsChecked} onChange={onChange} /> 없었다.
        <label id="bench-m">
          <input type="number" name="bench" value={bench} onChange={onChange} /> m 마다 하나씩 있었다.
        </label>
      </div>
      
    </div>
  )
};

export default Grest;