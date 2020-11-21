import React from "react";
import {
    useRecoilValue,
  } from 'recoil';
import SupportInfraItemCreator from 'functions/SupportInfraItemCreator';
import SupportInfraItem from 'components/molecules/SupportInfraItem';
import SupportInfraListState from 'recoilStates/SupportInfraListState';
import InputAddress from 'components/molecules/InputAddress';
import RoadNameInput from 'components/molecules/RoadNameInput';
import WarningInput from 'components/molecules/WarningInput';
import FeaturesInput from 'components/molecules/FeaturesInput';

import SelectEnv from 'components/molecules/SelectEnv';
import SelectPavement from 'components/molecules/SelectPavement';
import InfraListState from 'recoilStates/InfraListState';
import InfraItem from 'components/molecules/InfraItem';
import InfraItemCreator from 'functions/InfraItemCreator';

import AroundEnvListState from 'recoilStates/AroundEnvListState';
import AroundEnvItem from 'components/molecules/AroundEnvItem';
import AroundItemCreator from 'functions/AroundItemCreator'
import SearchedResultState from 'recoilStates/SearchedResultState';
import SearchResults from 'components/molecules/SearchResults';

const AddRoadForm = () => {
    const supportInfraList = useRecoilValue(SupportInfraListState);
    const infraList = useRecoilValue(InfraListState);
    const aroundList = useRecoilValue(AroundEnvListState);
    //정보등록 onclick으로 firebase.firestore 한번에 넣기
    const searchResults = useRecoilValue(SearchedResultState);
    
   
    return (
      <>
        <RoadNameInput placeholder="산책로 이름을 검색하고 위치를 추가해주세요" />
        <h3 id="road-head" style={{
          display: "none"
        }}>산책로 위치</h3>
        <InputAddress />
        <div id="search-results">
        {searchResults.map((data) => (
          <SearchResults key={data.id} data={data} />
        ))}
        </div>
        <SelectEnv />
        <SelectPavement />

        <h4>보조시설 추가</h4>
        <SupportInfraItemCreator />
        {supportInfraList.map((supportInfraItem) => (
          <SupportInfraItem key={supportInfraItem.id} item={supportInfraItem} />
        ))}


        <h4>시설 추가</h4>
        <InfraItemCreator />
        {infraList.map((infraItem) => (
          <InfraItem key={infraItem.id} item={infraItem} />
        ))}

        <h4>주변환경 추가</h4>
        <AroundItemCreator />
        {aroundList.map((aroundEnvItem) => (
          <AroundEnvItem key={aroundEnvItem.id} item={aroundEnvItem} />
        ))}

        <h4>걸을 때 주의사항</h4>
        <WarningInput placeholder="걸을 때 주의사항을 적어주세요" />
        
        <h4>산책로 특징</h4>
        <FeaturesInput placeholder="산책로의 특징을 적어주세요" />
      </>
    );
};

export default AddRoadForm;