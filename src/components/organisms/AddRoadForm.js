import React from "react";
import AddRoadStart from 'components/molecules/ForAddRoad/0Start/AddRoadStart';
import Aroad from 'components/molecules/ForAddRoad/1Roadname/Aroad';
import BroadEnv from 'components/molecules/ForAddRoad/2RoadEnv/BroadEnv';
import Cfence from 'components/molecules/ForAddRoad/3SafeFence/Cfence';
import CheckExist from 'components/molecules/ForAddRoad/4LeadBlock/CheckExist';
import Dleadblock from 'components/molecules/ForAddRoad/4LeadBlock/Dleadblock';
import Eothersup from 'components/molecules/ForAddRoad/5OtherSup/Eothersup';
import Fstairs from 'components/molecules/ForAddRoad/6Stairs/Fstairs';
import Grest from 'components/molecules/ForAddRoad/7RestPlace/Grest';
import Hpeople from 'components/molecules/ForAddRoad/8FloatingPop/Hpeople';
import Iaround from 'components/molecules/ForAddRoad/9AroundEnv/Iaround';
import JwarnFeat from 'components/molecules/ForAddRoad/10WarnFeature/JwarnFeat';

import ReactPageScroller from 'react-page-scroller';

const AddRoadForm = () => {
  const [ pageNum, setPageNum ] = React.useState(0);
  const [leadBlock, setLeadBlock] = React.useState(false);

  const handlePageChange = (pageNum) => {
    setPageNum(pageNum);
  };
    
    return (
      <div style={{
        display:'flex',
        width:'100%',

      }}>
        <div style={{
          display:"flex",
          width: window.innerWidth * 0.2,
          height: window.innerHeight * 0.8,
          backgroundColor: "black"
        }}></div>

        {leadBlock ?  <>
          <ReactPageScroller 
          containerWidth={window.innerWidth * 0.8} 
          containerHeight={window.innerHeight * 0.8}
          customPageNumber={pageNum}
          pageOnChange={handlePageChange} > 
            <AddRoadStart handlePageChange={handlePageChange} />

            <Aroad />
            <BroadEnv />
            <Cfence handlePageChange={handlePageChange} />

            <CheckExist handlePageChange={handlePageChange} setLeadBlock={setLeadBlock} />
            
              <Dleadblock />  
              <Eothersup />
              <Fstairs />
              <Grest />
              <Hpeople />
              <Iaround />
              <JwarnFeat />

          </ReactPageScroller>
      </>: 
      <>
        <ReactPageScroller 
          containerWidth={window.innerWidth * 0.8} 
          containerHeight={window.innerHeight * 0.8}
          customPageNumber={pageNum}
          pageOnChange={handlePageChange} > 
            <AddRoadStart handlePageChange={handlePageChange} />

            <Aroad />
            <BroadEnv />
            <Cfence handlePageChange={handlePageChange} />

            <CheckExist handlePageChange={handlePageChange} setLeadBlock={setLeadBlock} />
              
              <Eothersup />
              <Fstairs />
              <Grest />
              <Hpeople />
              <Iaround />
              <JwarnFeat />

          </ReactPageScroller>
      </>}
      </div>
    );
};

export default AddRoadForm;