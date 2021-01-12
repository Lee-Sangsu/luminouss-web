import React from 'react';

const EditNotice = ({braille, setBraille}) => {
    const onChange = (event) => {
        event.preventDefault();
        if (event.target.name === 'braille'){
            setBraille(event.target.value);
        }
    };
    return (
        <div style={window.innerWidth <500 ? {display:'flex', width:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}:{}}>
            <h4 id="supsubtitle">산책로 내부에 점자 표지판이 몇 개 있었나요?</h4>
            <label>
                <input id="number-input" type="number" name="braille" onChange={onChange} value={braille} placeholder="개수를 입력하세요" required style={{margin: '15px 0'}}/>개
            </label>
        </div>

    )
};

export default EditNotice;