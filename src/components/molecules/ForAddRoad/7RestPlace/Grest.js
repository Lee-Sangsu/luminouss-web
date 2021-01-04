import React, {useState} from "react";
import { useEffect } from "react";
import { useSetRecoilState } from 'recoil';
import ToiletState from 'recoilStates/Addroad/ToiletState';
import BenchState from 'recoilStates/Addroad/BenchState';

const Grest = () => {
  const setToilet = useSetRecoilState(ToiletState);
  const setBench = useSetRecoilState(BenchState);
  const [toiletNum, setToiletNum] = useState(0);
  const [bench, setBenchNum] = useState(0);
  const [toiletIsExist, setToiletExist] = useState(false);
  const [benchIsExist, setBenchExist] = useState(false);

  const onChange = (event) => {
    // event.preventDefault();
    if (event.target.name==='toilet'){
      setToiletNum(event.target.value);
      setToilet(`${event.target.value}m 마다 하나씩 있습니다.`);
    } else if (event.target.name==="bench") {
      setBenchNum(event.target.value);
      setBench(`${event.target.value}m 마다 하나씩 있습니다.`);
    } else if (event.target.name==="no-toilet"){
      setToiletExist(!toiletIsExist);
      setToilet('없었다.');
    } else if (event.target.name==="no-bench"){
      setBenchExist(!benchIsExist);
      setBench('없었다.');
    }
  }; 

  useEffect(() => {
    if (toiletIsExist) {
      document.getElementById('toilet-m').style.display = 'none';
    } else if (toiletIsExist === false) {
      document.getElementById('toilet-m').style.display = 'block';
    }
    if (benchIsExist) {
      document.getElementById('bench-m').style.display = 'none';
    } else if (benchIsExist === false) {
      document.getElementById('bench-m').style.display = 'block';
    } 
  }, [toiletIsExist, benchIsExist])
 // 10m씩 더해지게 해야겠다.
  return (
    <div id='rest'>
      <h2 id="subtitle">시설 및 환경에 대한 질문입니다.</h2>
      <h3 id='toilet' className='question'>산책로에 화장실은 얼마나 있었나요?</h3>
      <div id='toilet-input'>
        {/* <input type="checkbox" name="no-toilet" checked={toiletIsExist} onChange={onChange} /> 없었다. */}
        <label id="toilet-m">
           <input type="number" name="toilet" value={toiletNum} onChange={onChange} /> m 마다 하나씩 있었다.  
        </label>
      </div>
      <h3 id='bench' className='question'>산책로에 벤치와 같은 휴식 공간은 얼마나 있었나요?</h3>
      <div id='bench-input'>
      {/* <input type="checkbox" name="no-bench" checked={benchIsExist} onChange={onChange} /> 없었다. */}
        <label id="bench-m">
          <input type="number" name="bench" value={bench} onChange={onChange} /> m 마다 하나씩 있었다.
        </label>
      </div>
      
    </div>
  )
};

export default Grest;