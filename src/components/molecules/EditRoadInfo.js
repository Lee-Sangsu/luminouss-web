import React from 'react';
import {useHistory} from 'react-router-dom';
import firebase from 'global/fbase';
import EditRoadInfoState from 'recoilStates/EditRoadInfoState';
import {useRecoilValue} from 'recoil';

const EditRoadInfo = ({data}) => {
    const history = useHistory();
    
    const wannaEdit = useRecoilValue(EditRoadInfoState);

    const [address, setAddress] = React.useState(`${data.address_name}`);
    const [stair, setStair] = React.useState(`${data.stair_feature}`);
    const [warn, setWarn] = React.useState(`${data.warning}`);
    const [feature, setFeature] = React.useState(`${data.feature}`);

    const onChange = (event) => {
        event.preventDefault();
        if (event.target.name === 'add-edit') {
            setAddress(event.target.value);
        } else if (event.target.name === 'stair-edit') {
            setStair(event.target.value);
        } else if (event.target.name === 'warn-edit') {
            setWarn(event.target.value);
        } else if (event.target.name === 'feature-edit') {
            setFeature(event.target.value);
        }
    };

    const onClick =  () => {
        var roadRef = firebase.firestore().collection("WalkRoad").doc(data.id);

        roadRef.update({
            address_name: address,
            stair_feature: stair,
            warning: warn,
            feature: feature
        })
        .then(function() {
            window.alert("Document successfully updated!");
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
                <h1>산책로 수정하기</h1>
                <h3>옆에 버튼 누르고 수정해봐라</h3>

            </div>
        );
    } else if (wannaEdit === "env") {
        return (
            <div id='edit-container'>
                <h1>산책로 수정하기</h1>
                <h3>옆에 버튼 누르고 수정해봐라</h3>
                <button id='edit-confirm' onClick={onClick}> 등록 </button>
            </div>
        );
    } else if (wannaEdit === "address") {
        console.log("address");
    } else if (wannaEdit === "leadVoice") {
        console.log("address");
    } else if (wannaEdit === "leadBlock") {
        console.log("address");
    } else if (wannaEdit === "notice") {
        console.log("address");
    } else if (wannaEdit === "fence") {
        console.log("address");
    } else if (wannaEdit === "pavement") {
        console.log("address");
    } else if (wannaEdit === "stair") {
        console.log("address");
    } else if (wannaEdit === "warn") {
        console.log("address");
    } else if (wannaEdit === "toilet") {
        console.log("address");
    } else if (wannaEdit === "bench") {
        console.log("address");
    } else if (wannaEdit === "people") {
        console.log("address");
    } else if (wannaEdit === "feature") {
        console.log("address");
    }

    return (
        <div id='edit-container'>
                <h1>산책로 정보 수정하기</h1>
                <div id="edit-a-part">
                    <h3>종류 및 길이:</h3>
                    <input name="add-edit" type="text" value={address} onChange={onChange} />
                </div>
                
                <div id="edit-a-part">
                    <h3>주소:</h3>
                    <input name="add-edit" type="text" value={address} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>계단 특성:</h3>
                    <input name="stair-edit" type="text" value={stair} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>보조시설:</h3>
                    <input name="add-edit" type="text" value={address} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>걷기 편한 정도:</h3>
                    <input name="add-edit" type="text" value={address} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>걸을 때 주의 사항:</h3>
                    <input name="warn-edit" type="text" value={warn} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>산책로 시설 및 환경:</h3>
                    <input name="add-edit" type="text" value={address} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>산책로의 특징:</h3>
                    <input name="feature-edit" type="text" value={feature} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>주소:</h3>
                    <input name="add-edit" type="text" value={address} onChange={onChange} />
                </div>

                <button id='edit-confirm' onClick={onClick}> 등록 </button>

            </div>
    )
};

export default EditRoadInfo;
