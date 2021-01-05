import React from 'react';
import 'components/styles/Addroad/WaterQuestion.css';
const EditLeadBlock = ({setBlockInput, blockInput}) => {

    const handleOptionChange = (event) => {

        if (event.target.name === 'first-yes'){
            setBlockInput({
                ...blockInput, first: 2
            });
        } else if (event.target.name === 'first-no') {
            setBlockInput({
                ...blockInput, first: 0
            });
        } 
        
        else if (event.target.name === 'second-yes') {
            setBlockInput({
                ...blockInput, second: 2
            });
        } else if (event.target.name === 'second-no') {
            setBlockInput({
                ...blockInput, second: 0
            });
        } 

        else if (event.target.name === 'third-yes') {
            setBlockInput({
                ...blockInput, third: 2
            });
        } else if (event.target.name === 'third-no') {
            setBlockInput({
                ...blockInput, third: 0
            });
        } 

        else if (event.target.name === 'fourth-yes') {
            setBlockInput({
                ...blockInput, fourth: 2
            });
        } else if (event.target.name === 'fourth-no') {
            setBlockInput({
                ...blockInput, fourth: 0
            });
        } 

        else if (event.target.name === 'fifth-yes') {
            setBlockInput({
                ...blockInput, fifth: 2
            });
        } else if (event.target.name === 'fifth-no') {
            setBlockInput({
                ...blockInput, fifth: 0
            });
        } 
    };

    return (
        <div id='fence-page-e' style={{marginLeft:0, width:'100%'}}>
            <h2 className="fence-title">유도블록에 대한 질문입니다.</h2>
            <form>
                <div className="yes-no-e" >
                    <h6 className='yes-no-yes'>그렇다</h6>
                    <h6 className='yes-no-no'>아니다</h6>
                </div>
                <div className="questions-form-e">
                    <h5 className='question-e'>선형블록이 횡단보도가 아닌 도로를 향해있었나요?</h5>
                    <input className="yes-input" type="radio" value="yes" name="first-yes" checked={blockInput.first === 2} onChange={handleOptionChange} />
                    <input type="radio" value="no" name="first-no" checked={blockInput.first === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form-e">
                    <h5 className='question-e'>유도블록 위에 다른 시설물이나 이동식 장애물들이 있었나요?</h5>
                    <input className="yes-input" type="radio" value="yes" name="second-yes" checked={blockInput.second === 2} onChange={handleOptionChange} />
                    <input type="radio" value="no" name="second-no" checked={blockInput.second === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form-e">
                    <h5 className='question-e'>횡단보도 앞에 점형블록이 설치 되어있지 않았나요?</h5>
                    <input className="yes-input" type="radio" value="yes" name="third-yes" checked={blockInput.third === 2} onChange={handleOptionChange} />
                    <input type="radio" value="no" name="third-no" checked={blockInput.third === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form-e">
                    <h5 className='question-e'>바닥색과 유도블록의 구분이 어려웠었나요?</h5>
                    <input className="yes-input" type="radio" value="yes" name="fourth-yes" checked={blockInput.fourth === 2} onChange={handleOptionChange} />
                    <input type="radio" value="no" name="fourth-no" checked={blockInput.fourth === 0} onChange={handleOptionChange} /> 
                </div>
                <div className="questions-form-e">
                    <h5 className='question-e'>길은 안내하는 선형 점자블록이 중간에 끊겨 있었나요?</h5>
                    <input className="yes-input" type="radio" value="yes" name="fifth-yes" checked={blockInput.fifth === 2} onChange={handleOptionChange} />
                    <input type="radio" value="no" name="fifth-no" checked={blockInput.fifth === 0} onChange={handleOptionChange} /> 
                </div>
            </form>
        </div>
    )
};

export default EditLeadBlock;