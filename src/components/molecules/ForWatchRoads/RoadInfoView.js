import React from 'react';
import EditRoadInfoState from 'recoilStates/EditRoadInfoState';
import {useSetRecoilState} from 'recoil';
import { useHistory } from 'react-router-dom';

const RoadInfoView = ({data, isJustEdit}) => {
    const setWannaEdit = useSetRecoilState(EditRoadInfoState);

    // const setWannaEdit = (value) => {
        
    //     wannaEdit(value);
    // };

    const history = useHistory();

    const goPreviousPage = () => {
        history.push("/watch-roads");
    };
    
    return (
        <div id='info-container'>
            {window.innerWidth < 500 && isJustEdit===false ? <div id="arrow-div">
                <i className="arrow left" onClick={goPreviousPage} />
            </div> : <></>}
            <div id='info' className='road-name-container'>
                <h1 id='road-name'>{data.road_name}</h1>
                {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('road-name')} />:<></>}
            </div>
            <hr id="first-hr" />
            <div id='road-infos'>
                <div id= "info" >
                    <h3 id='sub-topics'>종류 및 길이</h3>
                    {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('env')} />:<></>}
                </div>
                    <h5 id='road-explanation'>{`환경:${data.road_env}`}</h5>
                    <h5 id='road-explanation'>{`산책로 전체 길이: ${data.entire_length}km`}</h5>
            </div>

            <hr id="middle-hr" />



            <div id='road-infos'>
               <div id="info">
                <h3 id='sub-topics'>주소</h3>
                   {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('address')} />:<></>}
                </div> 
                   <h5 id='road-explanation'>{`${data.address_name}에 위치해 있습니다.`}</h5>
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
                <h3 id='sub-topics'>근처 지하철역</h3>
                <h5 id='road-explanation'>{`${data.around_subway[0].place_name}, 도보로 ${data.around_subway[0].walk_time}분 소요됩니다.`}</h5>
                <h5 id='road-explanation'>{`${data.around_subway[1].place_name}, 도보로 ${data.around_subway[1].walk_time}분 소요됩니다.`}</h5>                
            </div>

            <hr id="middle-hr" />
        
            <div id='road-infos'>
                <h3 id='sub-topics'>보조시설</h3>
               <div id="info">
                   <h5 id='road-explanation'>{`음성유도기 점수: ${data.voice_induction}점`}</h5>
                   {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('leadVoice')} />:<></>}
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`유도블록 점수: ${data.side_walk_block}점`}</h5>
                   {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('leadBlock')} />:<></>}
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`점자표지판 점수: ${data.braille_notice}점`}</h5>
                   {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('notice')} />:<></>}
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`안전펜스 점수: ${data.safety_fence}점`}</h5>
                   {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('fence')} />:<></>}
                </div> 
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
               <div id="info">
                    <h3 id='sub-topics'>걷기 편한 정도</h3>
                   {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('pavement')} />:<></>}
                </div> 
                <h5 id='road-explanation'>{`길의 포장 재질: ${data.pavement}`}</h5>
                <h5 id='road-explanation'>{`계단 특성: ${data.stair_feature}`}</h5>
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
               <div id="info">
                <h3 id='sub-topics'>산책로 시설 및 환경</h3>
                {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('rest')} />:<></>}
                </div> 
                   <h5 id='road-explanation'>{`화장실: ${data.toilet}`}</h5>                  
                   <h5 id='road-explanation'>{`벤치와 쉬는 공간: ${data.bench_and_rest}`}</h5>

            </div>
            <hr id="middle-hr" />

            <div id='road-infos'>
               <div id="info">
                   <h3 id="sub-topics">유동인구</h3>
                   {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('people')} />:<></>}
                </div> 
                   <h5 id='road-explanation'>{`${data.walking_people}`}</h5>                
            </div>
            
            <hr id="middle-hr" />

            <div id='road-infos'>
                <div id="info">
                    <h3 id='sub-topics'>주변 환경</h3>
                    {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('aroundEnv')} />:<></>}
                </div>
                {data.around_env_list.map((doc) => <div key={doc.id} id='around-env'>
                    <h5 id='road-explanation'>{`${doc.category_group_name} ${doc.place_name}`}</h5>         
                    <h5 id='road-explanation'>{`위치: ${doc.address_name}`}</h5>         
                </div>)}
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
               <div id="info">
                <h3 id='sub-topics'>특징 및 주의사항</h3>
                {isJustEdit?<img id="info-edit-img" src={require('images/edit-icon.png').default} alt="산책로 정보 수정하기" onClick={() => setWannaEdit('feature')} />:<></>}
                </div> 
                <h5 id='road-explanation'>{`산책로의 특징: ${data.feature}`}</h5>         
                <h5 id='road-explanation'style={window.innerWidth>500?{marginBottom:'121px'}:{paddingBottom:'60px'}}>{`걸을 때 주의사항: ${data.warning}`}</h5>
            </div>

        </div>
    )
};

export default RoadInfoView;