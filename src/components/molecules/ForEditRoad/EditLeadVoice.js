import React from 'react';

const EditLeadVoice = ({voice, setVoice}) => {
    const onChange = (event) => {
        event.preventDefault();
        if(event.target.name === 'voice') {
            setVoice(event.target.value);
        }
    };
    return (
        <div>
            <h4 id="supsubtitle">산책로 내부나 산책로 주변 횡단보도에 음성유도기가 몇 개 있었나요?</h4>
            <label>
                <input id="number-input" type="number" name="voice" onChange={onChange} value={voice} placeholder="개수를 입력하세요" required style={{margin: '30px 0'}}/>개
            </label>
        </div>
    )
};

export default EditLeadVoice;