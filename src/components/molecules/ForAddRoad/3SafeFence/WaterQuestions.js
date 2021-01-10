import React from 'react';
import {useRecoilState} from 'recoil';
import FenceState from 'recoilStates/Addroad/FenceState';

const WaterQuestions = () => {
    //[]로 바꾸기 ts 문제 가능한데, js에선 ㄱㅊ
    const [input, setInput] = useRecoilState(FenceState);

    const handleOptionChange = (event) => {

        if (event.target.name === 'first-yes'){
            setInput({
                ...input, first: 2
            });
        } else if (event.target.name === 'first-no') {
            setInput({
                ...input, first: 0
            });
        } 
        
        else if (event.target.name === 'second-yes') {
            setInput({
                ...input, second: 2
            });
        } else if (event.target.name === 'second-no') {
            setInput({
                ...input, second: 0
            });
        } 

        else if (event.target.name === 'third-yes') {
            setInput({
                ...input, third: 2
            });
        } else if (event.target.name === 'third-no') {
            setInput({
                ...input, third: 0
            });
        } 

        else if (event.target.name === 'fourth-yes') {
            setInput({
                ...input, fourth: 2
            });
        } else if (event.target.name === 'fourth-no') {
            setInput({
                ...input, fourth: 0
            });
        } 

        else if (event.target.name === 'fifth-yes') {
            setInput({
                ...input, fifth: 2
            });
        } else if (event.target.name === 'fifth-no') {
            setInput({
                ...input, fifth: 0
            });
        } 
    };
    //var res = input; res[0] = 2 ; setInput(res);

    return(
        <div className='fence-page'>
            <h2 className="fence-title">안전펜스</h2>
            <h6 className="fence-notice">*다녀오신 산책로에 해당 장소가 없었다면 '있었음'을 눌러주세요</h6>
            <form>
                <div className="yes-no">
                    <h6 className='yes-no-yes'>있었음</h6>
                    <h6 className='yes-no-no'>없었음</h6>
                </div>
                <div className="questions-form">
                    <h5 className='question'>물가에 안전펜스가 있었나요?</h5>
                    <input className="yes-input" type="radio" name="first-yes" checked={input.first === 2} onChange={handleOptionChange} />
                    <input type="radio" name="first-no" checked={input.first === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form">
                    <h5 className='question'>자전거 도로와 인도 경계 사이에 안전펜스가 있었나요?</h5>
                    <input className="yes-input" type="radio" name="second-yes" checked={input.second === 2} onChange={handleOptionChange} />
                    <input type="radio" name="second-no" checked={input.second === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form">
                    <h5 className='question'>낙상 위험이 있는 곳에 안전펜스가 있었나요?</h5>
                    <input className="yes-input" type="radio"  name="third-yes" checked={input.third === 2} onChange={handleOptionChange} />
                    <input type="radio" name="third-no" checked={input.third === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form">
                    <h5 className='question'>계단에 손잡이가 있었나요?</h5>
                    <input className="yes-input" type="radio" name="fourth-yes" checked={input.fourth === 2} onChange={handleOptionChange} />
                    <input type="radio" name="fourth-no" checked={input.fourth === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form">
                    <h5 className='question'>걷는 길 전체적으로 안전펜스가 있었나요?</h5>
                    <input className="yes-input" type="radio"  name="fifth-yes" checked={input.fifth === 2} onChange={handleOptionChange} />
                    <input type="radio" name="fifth-no" checked={input.fifth === 0} onChange={handleOptionChange} /> 
                </div>
            </form>
        </div>
    )
};

export default WaterQuestions;