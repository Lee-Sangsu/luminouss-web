import React from 'react';
import {useRecoilState} from 'recoil';
import VoiceState from 'recoilStates/Addroad/VoiceState';
import BrailleState from 'recoilStates/Addroad/BrailleState';

const Eothersup = () => {
    const [voice, setVoice] = useRecoilState(VoiceState);
    const [braille, setBraille] = useRecoilState(BrailleState);

    const onChange = (event) => {
        event.preventDefault();
        if(event.target.name === 'voice') {
            setVoice(event.target.value);
        } else if (event.target.name === 'braille'){
            setBraille(event.target.value);
        }
    };

    return (
        <div style={{
            display:'flex',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column'
        }}>
            <h4>산책로 내부나 산책로 주변 횡단보도에 몇 개의 음성유도기가 있었나요?</h4>
            <label>
                <input type="number" name="voice" onChange={onChange} value={voice} required />개
            </label>
            <h4>산책로 내부에 몇 개의 점자 표지판이 있었나요?</h4>
            <label>
                <input type="number" name="braille" onChange={onChange} value={braille} required />개
            </label>
        </div>

    )
};

export default Eothersup;