import React, {useState} from "react";
import { useSetRecoilState } from 'recoil';
import ToiletState from 'recoilStates/Addroad/ToiletState';
import BenchState from 'recoilStates/Addroad/BenchState';

const Grest = ({handlePageChange}) => {
  const setToilet = useSetRecoilState(ToiletState);
  const setBench = useSetRecoilState(BenchState);

  const [mQuestion, setMQuestion] = useState(0);
  const [benchMQuestion, setBenchMQuestion] = useState(0);
  const [toiletNum, setToiletNum] = useState(0);
  const [bench, setBenchNum] = useState(0);
  const [toiletIsExist, setToiletExist] = useState(0);
  const [benchIsExist, setBenchExist] = useState(0);

  const onChange = (event) => {
    // event.preventDefault();
    if (event.target.name==='toilet-q'){
      setToiletNum(event.target.value);
      setToilet(`${event.target.value}개 있습니다.`);
    } else if (event.target.name==='toilet-m'){
      setToiletNum(event.target.value);
      setToilet(`${event.target.value}m 마다 하나씩 있습니다.`);
    } else if (event.target.name==="first-yes"){
      setToiletExist(true);
      document.getElementById("first-toilet").style.display='none';
    }  else if (event.target.name==="first-no"){
      setToiletExist(false);
      setToilet('없었다.');
      document.getElementById("first-toilet").style.display='none';
    } else if (event.target.name==="second-yes"){
      setMQuestion(false);
      setToiletExist(false);
      document.getElementById("first-toilet").style.display='none';
      document.getElementById('toilet-input').style.display = 'block';
      document.getElementById('second-toilet').style.display = 'none';
      document.getElementById('toilet-yes-no').style.display = 'none';
    }  else if (event.target.name==="second-no"){
      setMQuestion(true);
      setToiletExist(false);
      document.getElementById("first-toilet").style.display='none';
      document.getElementById('toilet-input').style.display = 'block';
      document.getElementById('second-toilet').style.display = 'none';
      document.getElementById('toilet-yes-no').style.display = 'none';
    } else if (event.target.name==="first-b-yes"){
      setBenchExist(true);
      document.getElementById("first-bench").style.display = 'none';
      
    } else if (event.target.name==="first-b-no"){
      setBenchExist(false);
      setBench('없었다.');
    } else if (event.target.name==="second-b-yes"){
      setBenchMQuestion(false);
      document.getElementById("first-bench").style.display='none';
      document.getElementById('bench-input').style.display = 'block';
      document.getElementById('second-bench').style.display = 'none';
      document.getElementById('bench-yes-no').style.display = 'none';

    } else if (event.target.name==="second-b-no"){
      setBenchMQuestion(true);
      document.getElementById("first-bench").style.display='none';
      document.getElementById('bench-input').style.display = 'block';
      document.getElementById('second-bench').style.display = 'none';
      document.getElementById('bench-yes-no').style.display = 'none';
      
    } else if (event.target.name==="bench-q"){
      setBenchNum(event.target.value);
      setBench(`${event.target.value}개 있습니다.`);
    } else if (event.target.name==="bench-m"){
      setBenchNum(event.target.value);
      setBench(`${event.target.value}m 마다 하나씩 있습니다.`);
    }
  }; 

  return (
    <div id='rest'>
      <h2 id="subtitle">시설 및 환경에 대한 질문입니다.</h2>
      <form>
        <div id="toilet-yes-no" className="yes-no">
            <h6 className='yes-no-yes'>있었다</h6>
            <h6 className='yes-no-no'>없었다</h6>
        </div>
        <div id="first-toilet">
          <div className="questions-form" >
            <h3 className='question'>산책로에 화장실이 있었나요?</h3>
            <input className="yes-input" type="radio" value="yes" name="first-yes" checked={toiletIsExist === true} onChange={onChange} />
            <input type="radio" value="no" name="first-no" checked={toiletIsExist === false} onChange={onChange} /> 
          </div>
        </div>
        {toiletIsExist ?<div id="second-toilet"> <div className="questions-form">
          <h3 id='toilet' className='question'>산책로에 있는 화장실을 셀 수 있었나요?</h3>
          <input className="yes-input" type="radio" value="yes" name="second-yes" checked={mQuestion === false} onChange={onChange} />
          <input type="radio" value="no" name="second-no" checked={mQuestion === true} onChange={onChange} /> 
        </div></div>:<></>}
          {mQuestion ? 
          <div id='toilet-input'>
            <label id="toilet-q">
              <input type="number" name="toilet-m" value={toiletNum} onChange={onChange} /> m 마다 하나씩 있었다.  
            </label>
          </div>  
          : <div id='toilet-input'>
              <label id="toilet-q">
                <input type="number" name="toilet-q" value={toiletNum} onChange={onChange} /> 개가 있었다.  
              </label>
            </div>  }  
      

      <div id="bench-yes-no" className="yes-no">
          <h6 className='yes-no-yes'>있었다</h6>
          <h6 className='yes-no-no'>없었다</h6>
      </div>
      <div id="first-bench">
          <div className="questions-form" >
            <h3 className='question'>산책로에 벤치와 같은 휴식 공간이 있었나요?</h3>
            <input className="yes-input" type="radio" value="yes" name="first-b-yes" checked={benchIsExist === true} onChange={onChange} />
            <input type="radio" value="no" name="first-b-no" checked={benchIsExist === false} onChange={onChange} /> 
          </div>
        </div>
        {benchIsExist ? <div id="second-bench"> <div className="questions-form">
          <h3 id='bench' className='question'>산책로에 있는 벤치와 같은 휴식 공간 등을 셀 수 있었나요?</h3>
          <input className="yes-input" type="radio" value="yes" name="second-b-yes" checked={benchMQuestion === false} onChange={onChange} />
          <input type="radio" value="no" name="second-b-no" checked={benchMQuestion === true} onChange={onChange} /> 
        </div></div>:<></>}

        {benchMQuestion ? 
          <div id='bench-input'>
            <label id="bench-m">
              <input type="number" name="bench-m" value={bench} onChange={onChange} /> m 마다 하나씩 있었다.
            </label>
          </div>
        : <div id='bench-input'>
            <label id="bench-q">
              <input type="number" name="bench-q" value={bench} onChange={onChange} /> 개가 있었다.
            </label>
          </div>
        }

      </form>
      <button id="to-next-page" onClick={() => handlePageChange(9)}>확인</button>
    </div>
  )
};

export default Grest;