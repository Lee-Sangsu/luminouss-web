import React from 'react';
import {
    useRecoilValue,
  } from 'recoil';
  import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
  import AroundEnvItem from 'components/molecules/ForAddRoad/9AroundEnv/AroundEnvItem';
  import SearchAroundEnv from 'components/molecules/ForAddRoad/9AroundEnv/SearchAroundEnv';
  import EnvSearchState from 'recoilStates/Addroad/searched/EnvSearchState';
  import EnvSearchResults from 'components/molecules/ForAddRoad/9AroundEnv/EnvSearchResult';
  
const EditAroundEnv = () => {
    const aroundList = useRecoilValue(AroundEnvListState);
    const envSearchResults = useRecoilValue(EnvSearchState);
    return (
        <div>
            <h3>산책로 주변 환경 추가하기</h3>
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
        </div>

    )
};

export default EditAroundEnv;