import React from 'react';
import {useRecoilState} from 'recoil';
import VoiceState from 'recoilStates/Addroad/VoiceState';
import BrailleState from 'recoilStates/Addroad/BrailleState';

const Eothersup = ({handlePageChange}) => {
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
            <h3 id="subtitle">보조시설에 대한 질문입니다.</h3>
            <h4 id="supsubtitle">산책로 내부나 산책로 주변 횡단보도에 음성안내기가 몇 개 있었나요?</h4>
            <label>
                <input id="number-input" type="number" name="voice" onChange={onChange} value={voice} placeholder="개수를 입력하세요" required style={{margin: '30px 0'}}/>개
            </label>
            <h4 id="supsubtitle">산책로 내부에 점자 표지판이 몇 개 있었나요?</h4>
            <label>
                <input id="number-input" type="number" name="braille" onChange={onChange} value={braille} placeholder="개수를 입력하세요" required style={{margin: '15px 0'}}/>개
            </label>
            <button id="to-next-page" onClick={() => handlePageChange(7)}>확인</button>
        </div>

    )
};

export default Eothersup;