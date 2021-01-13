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
import Informations from 'components/molecules/ForAddRoad/Informations';

const AddRoadForm = () => {
  const [ pageNum, setPageNum ] = React.useState(0);
  const [leadBlock, setLeadBlock] = React.useState(false);
  React.useEffect(() => {
    setTimeout(()=>{document.getElementById("header-nav").style.zIndex = 0;},100); 
  }, [])

  const handlePageChange = (pageNum) => {
    setPageNum(pageNum);
  };
    
    return (
      <div style={{display:'flex', width:'100%', height:'100%'}}>

        {window.innerWidth > 500 ? <Informations /> : <></>}

        <ReactPageScroller 
        containerWidth={window.innerWidth > 500 ?  window.innerWidth * 0.7 : window.innerWidth} 
        containerHeight={'100%'}
        customPageNumber={pageNum}
        pageOnChange={handlePageChange}
        animationTimer={1500}  > 
          <AddRoadStart handlePageChange={handlePageChange} />

          <Aroad handlePageChange={handlePageChange} />
          <BroadEnv handlePageChange={handlePageChange} />
          <Cfence handlePageChange={handlePageChange} />

          <CheckExist handlePageChange={handlePageChange} setLeadBlock={setLeadBlock} />
        
          <Dleadblock handlePageChange={handlePageChange} leadBlock={leadBlock} />  
          <Eothersup handlePageChange={handlePageChange} />
          <Fstairs handlePageChange={handlePageChange} />
          <Grest handlePageChange={handlePageChange} />
          <Hpeople handlePageChange={handlePageChange} />
          <Iaround handlePageChange={handlePageChange} />
          <JwarnFeat />

        </ReactPageScroller>
      </div>
    );
};

export default AddRoadForm;