import React from 'react';

const EditRoadName = ({value, onChange}) => {
    return (
        <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <h2 >산책로의 이름을 수정해주세요</h2>
            <input id="text-input" onChange={onChange} name="road-name-edit" type="text" value={value}></input>
        </div>
    )
};

export default EditRoadName;