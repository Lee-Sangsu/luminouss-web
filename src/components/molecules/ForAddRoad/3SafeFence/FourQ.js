import React from 'react';
import {useRecoilState} from 'recoil';
import FenceState from 'recoilStates/Addroad/FenceState';

const FourQ = ({firstQ, secondQ, thirdQ, fourthQ}) => {
    //[]로 바꾸기 ts 문제 가능한데, js에선 ㄱㅊ
    const [input, setInput] = useRecoilState(FenceState);

    const handleOptionChange = (event) => {

        if (event.target.name === 'first-yes'){
            setInput({
                ...input, first: 2.5
            });
        } else if (event.target.name === 'first-no') {
            setInput({
                ...input, first: 0
            });
        } 
        
        else if (event.target.name === 'second-yes') {
            setInput({
                ...input, second: 2.5
            });
        } else if (event.target.name === 'second-no') {
            setInput({
                ...input, second: 0
            });
        } 

        else if (event.target.name === 'third-yes') {
            setInput({
                ...input, third: 2.5
            });
        } else if (event.target.name === 'third-no') {
            setInput({
                ...input, third: 0
            });
        } 

        else if (event.target.name === 'fourth-yes') {
            setInput({
                ...input, fourth: 2.5
            });
        } else if (event.target.name === 'fourth-no') {
            setInput({
                ...input, fourth: 0
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
                    <h6>없었음</h6>
                </div>
                <div className="questions-form">
                    <h5 className='question'>{firstQ}</h5>
                    <input className="yes-input" type="radio" name="first-yes" checked={input.first === 2.5} onChange={handleOptionChange} />
                    <input type="radio" name="first-no" checked={input.first === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form">
                    <h5 className='question'>{secondQ}</h5>
                    <input className="yes-input" type="radio" name="second-yes" checked={input.second === 2.5} onChange={handleOptionChange} />
                    <input type="radio" name="second-no" checked={input.second === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form">
                    <h5 className='question'>{thirdQ}</h5>
                    <input className="yes-input" type="radio"  name="third-yes" checked={input.third === 2.5} onChange={handleOptionChange} />
                    <input type="radio" name="third-no" checked={input.third === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form">
                    <h5 className='question'>{fourthQ}</h5>
                    <input className="yes-input" type="radio" name="fourth-yes" checked={input.fourth === 2.5} onChange={handleOptionChange} />
                    <input type="radio" name="fourth-no" checked={input.fourth === 0} onChange={handleOptionChange} /> 
                </div>
                
            </form>
        </div>
    )
};

export default FourQ;