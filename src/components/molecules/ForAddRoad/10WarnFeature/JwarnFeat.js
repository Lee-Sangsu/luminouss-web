import React from "react";
import WarningInput from 'components/molecules/ForAddRoad/10WarnFeature/WarningInput';
import FeaturesInput from 'components/molecules/ForAddRoad/10WarnFeature/FeaturesInput';

const JwarnFeat = () => {
    return (
        <div style={{
          display:'flex',
          height:'100%',
          flexDirection:'column',
          width:'100%',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <h4>걸을 때 주의사항</h4>
          <WarningInput placeholder="걸을 때 주의사항을 적어주세요" />
          
          <h4>산책로 특징</h4>
          <FeaturesInput placeholder="산책로의 특징을 적어주세요" />
        </div>
    )
};

export default JwarnFeat;