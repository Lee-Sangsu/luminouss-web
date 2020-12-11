import React from "react";

import Aroad from 'components/molecules/ForAddRoad/1Roadname/Aroad';
import BroadEnv from 'components/molecules/ForAddRoad/2RoadEnv/BroadEnv';
import Csupport from 'components/molecules/ForAddRoad/3SuppportInfra/Csupport';
import Drest from 'components/molecules/ForAddRoad/4RestPlace/Drest';
import Epeople from 'components/molecules/ForAddRoad/5FloatingPop/Epeople';
import Faround from 'components/molecules/ForAddRoad/6AroundEnv/Faround';
import GwarnFeat from 'components/molecules/ForAddRoad/7WarnFeature/GwarnFeat';

import ReactPageScroller from 'react-page-scroller';

const AddRoadForm = () => {
    
    return (
      <>
        <ReactPageScroller containerHeight={window.innerHeight * 0.7}> 
          <Aroad />
          <BroadEnv />
          <Csupport />
          <Drest />
          <Epeople />
          <Faround />
          <GwarnFeat />

        </ReactPageScroller>
      </>
    );
};

export default AddRoadForm;