import React from 'react';

const EditFeature = ({feature,
    onChange,
    warning}) => {
    return (
        <div>
            <h4 id="subsubtitle">산책로 특징</h4>
            <textarea name="feature" onChange={onChange} value={feature} id='feature-input' required/>
            <h4 id="subsubtitle">걸을 때 주의사항</h4>
            <textarea name="warning" onChange={onChange} value={warning} id='feature-input' required/>
        </div>
    )
};

export default EditFeature;