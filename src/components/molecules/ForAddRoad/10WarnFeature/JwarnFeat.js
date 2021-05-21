import React from "react";
import WarningInput from 'components/molecules/ForAddRoad/10WarnFeature/WarningInput';
import FeaturesInput from 'components/molecules/ForAddRoad/10WarnFeature/FeaturesInput';


const JwarnFeat = ({handlePageChange}) => {

  return (
      <div id="warning-container">
        <h3 style={{marginBottom:'30px'}} id="subtitle">특징 및 주의사항을 기재해주세요.</h3>
        
        <h4 id="subsubtitle">산책로 특징</h4>
        <FeaturesInput />

        <h4 id="subsubtitle">걸을 때 주의사항</h4>
        <WarningInput  />
        
        <button id="to-next-page" onClick={() => handlePageChange(12)}>확인</button>
      </div>
  )
};

export default JwarnFeat;