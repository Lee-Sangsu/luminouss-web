import React from 'react';

const EditAddress = ({onChange,
    addressValue}) => {
    return (
        <div>
            <h2>산책로의 주소을 수정해주세요</h2>
            <input id="text-input" name="add-edit" onChange={onChange} type="text" value={addressValue} />
        </div>
    )
};

export default EditAddress;