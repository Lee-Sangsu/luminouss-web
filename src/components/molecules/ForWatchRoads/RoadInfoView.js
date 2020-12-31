import React from 'react';
import 'components/styles/RoadInfo.css';
import EditRoadInfoState from 'recoilStates/EditRoadInfoState';
import {useSetRecoilState} from 'recoil';

const RoadInfoView = ({data}) => {
    const wannaEdit = useSetRecoilState(EditRoadInfoState);

    const setWannaEdit = (event) => {
        
        wannaEdit(event.target.name);
    };
    
    return (
        <div id='info-container'>
            <h1 id='road-name'>{data.road_name}</h1>
            <hr id="first-hr" />
            <div id='road-infos'>
                <h3 id='sub-topics'>종류 및 길이</h3>
                <div id= "info" >
                    <h5 id='road-explanation'>{`${data.road_env}이며, 총 길이는 ${data.entire_length}km 입니다.`}</h5>
                    <button id="edit-click" onClick={setWannaEdit} name='env' />
                    {/* <img src={require('images/pencil.png').default} alt="정보 수정" /> */}
                </div>
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
                <h3 id='sub-topics'>주소</h3>
               <div id="info">
                   <h5 id='road-explanation'>{`${data.address_name}에 위치해 있습니다.`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='address' />
                </div> 
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
                   <button id="edit-click" onClick={setWannaEdit} name='leadVoice' />
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`유도블록 점수: ${data.side_walk_block}점`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='leadBlock' />
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`점자표지판 점수: ${data.braille_notice}점`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='notice' />
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`안전펜스 점수: ${data.safety_fence}점`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='fence' />
                </div> 
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
                <h3 id='sub-topics'>걷기 편한 정도</h3>
               <div id="info">
                   <h5 id='road-explanation'>{`길의 포장 재질: ${data.pavement}`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='pavement' />
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`계단 특성: ${data.stair_feature}`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='stair' />
                </div> 
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
                <h3 id='sub-topics'>걸을 때 주의 사항</h3>
               <div id="info">
                   <h5 id='road-explanation'>{`${data.warning}`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='warn' />
                </div> 
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
                <h3 id='sub-topics'>산책로 시설 및 환경</h3>
               <div id="info">
                   <h5 id='road-explanation'>{`화장실: ${data.toilet}`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='toilet' />
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`벤치와 쉬는 공간: ${data.bench_and_rest}`}</h5>
                   <button id="edit-click" onClick={setWannaEdit} name='bench' />
                </div> 
               <div id="info">
                   <h5 id='road-explanation'>{`유동 인구: ${data.walking_people}`}</h5>                
                   <button id="edit-click" onClick={setWannaEdit} name='people' />
                </div> 
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
                <h3 id='sub-topics'>산책로의 특징</h3>
               <div id="info">
                   <h5 id='road-explanation'>{`${data.feature}`}</h5>         
                   <button id="edit-click" onClick={setWannaEdit} name="feature" />
                </div> 
            </div>

            <hr id="middle-hr" />

            <div id='road-infos'>
                <h3 id='sub-topics'>주변 환경</h3>
                {data.around_env_list.map((doc) => <div key={doc.id} id='around-env'>
                    <h5 id='road-explanation'>{`${doc.category_group_name} ${doc.place_name}`}</h5>         
                    <h5 id='road-explanation'>{`위치: ${doc.address_name}`}</h5>         
                </div>)}
            </div>

        </div>
    )
};

export default RoadInfoView;