import React from "react";

import Aroad from 'components/molecules/ForAddRoad/1Roadname/Aroad';
import BroadEnv from 'components/molecules/ForAddRoad/2RoadEnv/BroadEnv';
import Cfence from 'components/molecules/ForAddRoad/3SafeFence/Cfence';
import Dleadblock from 'components/molecules/ForAddRoad/4LeadBlock/Dleadblock';
import Eothersup from 'components/molecules/ForAddRoad/5OtherSup/Eothersup';
import Fstairs from 'components/molecules/ForAddRoad/6Stairs/Fstairs';
import Grest from 'components/molecules/ForAddRoad/7RestPlace/Grest';
import Hpeople from 'components/molecules/ForAddRoad/8FloatingPop/Hpeople';
import Iaround from 'components/molecules/ForAddRoad/9AroundEnv/Iaround';
import JwarnFeat from 'components/molecules/ForAddRoad/10WarnFeature/JwarnFeat';

import ReactPageScroller from 'react-page-scroller';

const AddRoadForm = () => {
    
    return (
      <div style={{
        display:'flex',
        width:'100%',

      }}>
        <div style={{
          display:"flex",
          width: window.innerWidth * 0.2,
          height: window.innerHeight * 0.7,
          backgroundColor: "black"
        }}></div>
        <ReactPageScroller containerWidth={window.innerWidth * 0.8} containerHeight={window.innerHeight * 0.7}> 
          <Aroad />
          <BroadEnv />
          <Cfence />
          <Dleadblock />
          <Eothersup />
          <Fstairs />
          <Grest />
          <Hpeople />
          <Iaround />
          <JwarnFeat />

        </ReactPageScroller>
      </div>
    );
};

export default AddRoadForm;