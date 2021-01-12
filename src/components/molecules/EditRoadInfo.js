import React from 'react';
import {useHistory} from 'react-router-dom';
import firebase from 'global/fbase';
import EditRoadInfoState from 'recoilStates/EditRoadInfoState';
import {useRecoilState, useRecoilValue} from 'recoil';
import Subject from 'components/molecules/Subject';
import swal from 'sweetalert';
import EditFeature from './ForEditRoad/EditFeature';
import EditAddress from './ForEditRoad/EditAddress';
import EditRest from './ForEditRoad/EditRest';
import EditPavement from './ForEditRoad/EditPavement';
import EditFence from './ForEditRoad/EditFence';
import EditRoadName from './ForEditRoad/EditRoadName';
import EditEnv from './ForEditRoad/EditEnv';
import EditLeadVoice from './ForEditRoad/EditLeadVoice';
import EditLeadBlock from './ForEditRoad/EditLeadBlock';
import EditNotice from './ForEditRoad/EditNotice';
import EditPeople from './ForEditRoad/EditPeople';
import EditAroundEnv from './ForEditRoad/EditAroundEnv';

import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
import FenceState from 'recoilStates/Addroad/FenceState';

const EditRoadInfo = ({data}) => {
    const history = useHistory();

    const aroundList = useRecoilValue(AroundEnvListState);
    
    const [wannaEdit, setWannaEdit] = useRecoilState(EditRoadInfoState);
    const fence = useRecoilValue(FenceState);

    const [address, setAddress] = React.useState(`${data.address_name}`);
    const [feature, setFeature] = React.useState(`${data.feature}`);
    const [warning, setWarning] = React.useState(`${data.warning}`);
    const [people, setPeople] = React.useState({}); //update 할 때 summary 해줘야해
    const [pavementState, setPavementState] = React.useState(`${data.pavement}`);
    const [stairs, setStairState] = React.useState(`${data.stair_feature}`);
    const [voice, setVoice] = React.useState(data.voice_induction / 2);
    const [blockInput, setBlockInput] = React.useState({});
    const [braille, setBraille] = React.useState('') ;
    const [envState, setEnvState] = React.useState(`${data.road_env}`);
    const [length, setLength] = React.useState(`${data.entire_length}`);
    const [roadName, setRoadName] =  React.useState(`${data.road_name}`);
    const [toilet, setToilet] =  React.useState(`${data.toilet}`);
    const [bench, setBench] =  React.useState(`${data.bench_and_rest}`);
    
    const onChange = (event) => {
        event.preventDefault();
        if (event.target.name === 'add-edit') {
            setAddress(event.target.value);
        } else if (event.target.name === 'stair-edit') {
            setStairState(event.target.value);
        } else if (event.target.name === 'feature') {
            setFeature(event.target.value);
        } else if (event.target.name === 'warning') {
            setWarning(event.target.value);
        } else if (event.target.name === 'road-name-edit') {
            setRoadName(event.target.value);
        }
    };

    const onUpdateClick =  () => {
        var roadRef = firebase.firestore().collection("WalkRoad").doc(data.id);

        var walking_people;
        var voiceInductionScore = 0;
        var leadBlockScore = 0;
        var brailleScore = 0;
        var fenceScore = 0;
        if (people.population === '없었습니다') {
            walking_people = `${people.time}에 유동인구가 ${people.population}`
        } else {
            walking_people = `${people.time}에 ${people.peopleKind} ${people.population}`
        }
        if (braille >= 5) {
            brailleScore = 10;
        } else {
            brailleScore = braille * 2;
        }

        var y;
        for (y in fence) {
            fenceScore += fence[y];
        }

        var x;
        for(x in blockInput){
            leadBlockScore += blockInput[x];
        }
    
        if (voice >= 5) {
            voiceInductionScore = 10;
        } else {
            voiceInductionScore = voice * 2;
        }

        roadRef.update({
            address_name: address,
            stair_feature: stairs,
            warning: warning,
            feature: feature,
            around_env_list: data.around_env_list.concat(aroundList),
            walking_people: walking_people,
            pavement:pavementState,
            voice_induction: voiceInductionScore,
            side_walk_block: leadBlockScore,
            braille_notice: brailleScore,
            safety_fence: fenceScore,
            road_env:envState,
            entire_length:length,
            road_name:roadName,
            bench_and_rest: bench,
            toilet:toilet
        })
        .then(function() {
            swal("정보가 성공적으로 수정되었습니다!");
            history.push('/watch-roads');
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    };

    if (wannaEdit === "") {
        return (
            <div id='edit-container'>
                <Subject id='edit-road-plz' circleColor='rgba(255, 193, 7, 1)' text="산책로 정보 수정하기" />
                <h3 id="click-icon-plz">정보 수정을 원하시면, 수정하고 싶은 부분의 연필 아이콘을 클릭해주세요.</h3>
            </div>
        );
    } else if (wannaEdit === "road-name") {
        return (
            <div id='edit-container'>
                <EditRoadName value={roadName} onChange={onChange} />
                {/* <span>road name it</span> */}
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
                {/* <button id='edit-confirm' onClick={onClick}> 등록 </button> */}
            </div>
        );
    } else if (wannaEdit === "env") {
        return (
            <div id='edit-container'>
                <EditEnv envState={envState} setEnvState={setEnvState} length={length} setLength={setLength}  />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "address") {
        // 돼쓰 but text-input 태그 스타일링 필요
        return (
            <div id='edit-container'>
                <EditAddress onChange={onChange} addressValue={address} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "leadVoice") {
        return (
            <div id='edit-container'>
                <EditLeadVoice voice={voice} setVoice={setVoice} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "leadBlock") {
        return (
            <div id='edit-container'>
                <EditLeadBlock blockInput={blockInput} setBlockInput={setBlockInput} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "notice") {
        return (
            <div id='edit-container'>
                <EditNotice braille={braille} setBraille={setBraille} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "fence") {
        return (
            <div id='edit-container'>
                <EditFence env={data.road_env} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "pavement") {
        return (
            <div id='edit-container'>
                <EditPavement stairs={stairs} setStairState={setStairState} pavementState={pavementState} setPavementState={setPavementState} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "rest") {
        return (
            <div id='edit-container'>
                <EditRest setBench={setBench} setToilet={setToilet} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "people") {
        return (
            <div id='edit-container'>
                <EditPeople people={people} setPeople={setPeople} />
                
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "aroundEnv") {
        return (
            <div id='edit-container'>
                <EditAroundEnv />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "feature") {
        // 돼쓰
        return (
            <div id='edit-container'>
                <EditFeature feature={feature} onChange={onChange} warning={warning} />
                <button id="to-next-page" onClick={() => setWannaEdit('no-anymore')}>확인</button>
            </div>
        );
    } else if (wannaEdit === "no-anymore") {
        return (
            <div id="edit-container">
                <h2>수정된 산책로 정보를 등록하시겠습니까?</h2>
                <h4>*다른 정보들을 더 수정할 수 있습니다.</h4>
                <button id='to-next-page' onClick={onUpdateClick}> 등록 </button>
            </div>
        )
    }
};

export default EditRoadInfo;
