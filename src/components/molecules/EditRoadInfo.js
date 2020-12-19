import React from 'react';
import {useHistory} from 'react-router-dom';
import firebase from 'global/fbase';


const EditRoadInfo = ({data}) => {
    const history = useHistory();

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

        // Set the "capital" field of the city 'DC'
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

    return (
        <div id='edit-container'>
                <h1>산책로 정보 수정하기</h1>
                <div id="edit-a-part">
                    <h3>주소:</h3>
                    <input name="add-edit" type="text" value={address} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>계단 특성:</h3>
                    <input name="stair-edit" type="text" value={stair} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>걸을 때 주의 사항:</h3>
                    <input name="warn-edit" type="text" value={warn} onChange={onChange} />
                </div>
                <div id="edit-a-part">
                    <h3>산책로의 특징:</h3>
                    <input name="feature-edit" type="text" value={feature} onChange={onChange} />
                </div>

                <button id='edit-confirm' onClick={onClick}> 등록 </button>

            </div>
    )
};

export default EditRoadInfo;
