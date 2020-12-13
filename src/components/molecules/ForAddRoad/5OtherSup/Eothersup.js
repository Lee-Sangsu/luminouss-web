import React, {useState} from 'react';

const Eothersup = () => {
    const [voice, setVoice] = useState(0);
    const [braille, setBraille] = useState(0);

    const onChange = (event) => {
        event.preventDefault();
        if(event.target.name === 'voice') {
            setVoice(event.target.value);
        } else if (event.target.name === 'braille'){
            setBraille(event.target.value);
        }
    };

    return (
        <>
        <h4>산책로 내부나 산책로 주변 횡단보도에 몇 개의 음성유도기가 있었나요?</h4>
        <input type="number" name="voice" onChange={onChange} value={voice} required />개
        <h4>산책로 내부에 몇 개의 점자 표지판이 있었나요?</h4>
        <input type="number" name="braille" onChange={onChange} value={braille} required />개
        </>

    )
};

export default Eothersup;