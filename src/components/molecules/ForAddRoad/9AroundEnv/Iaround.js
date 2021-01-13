import React from 'react';
import {
  useRecoilValue,
} from 'recoil';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
import AroundEnvItem from 'components/molecules/ForAddRoad/9AroundEnv/AroundEnvItem';
import SearchAroundEnv from 'components/molecules/ForAddRoad/9AroundEnv/SearchAroundEnv';
import EnvSearchState from 'recoilStates/Addroad/searched/EnvSearchState';
import EnvSearchResults from 'components/molecules/ForAddRoad/9AroundEnv/EnvSearchResult';

const Iaround = ({handlePageChange}) => {
    const aroundList = useRecoilValue(AroundEnvListState);
    const envSearchResults = useRecoilValue(EnvSearchState);

    return (
        <div id='iaround-container'>
          <h4>산책로 근처에는 어떤 음식점이나 카페들이 있었나요? (복수 입력 가능)</h4>
          <SearchAroundEnv placeholder="음식점 이름 등을 입력하세요" />
          <div id="aroundenv">
            {envSearchResults.slice(0, 5).map((data) => (
              <EnvSearchResults key={data.id} data={data} />
            ))}
          </div>

          <div id="aroundEnvList">
            {aroundList.map((aroundEnvItem) => (
              <AroundEnvItem key={aroundEnvItem.id} item={aroundEnvItem} />
            ))}
          </div>
          <button id="to-next-page" onClick={() => handlePageChange(11)}>확인</button>
        </div>
    )
};

export default Iaround;