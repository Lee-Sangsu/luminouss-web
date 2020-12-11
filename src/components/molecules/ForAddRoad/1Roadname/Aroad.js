import React from 'react';
import {
useRecoilValue,
} from 'recoil';
import InputAddress from 'components/molecules/ForAddRoad/1Roadname/InputAddress';
import RoadNameInput from 'components/molecules/ForAddRoad/1Roadname/RoadNameInput';
import SearchedResultState from 'recoilStates/Addroad/searched/SearchedResultState';
import SearchResults from 'components/molecules/ForAddRoad/1Roadname/SearchResults';

const Aroad = () => {
    const searchResults = useRecoilValue(SearchedResultState);

    return ( 
        <div style={{
          display:'flex',
          height:'100%',
          flexDirection:'column',
          width:'100%',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <h3>새로운 산책로을 검색하고 위치를 추가해주세요</h3>
          <RoadNameInput placeholder="산책로 이름" />
          <InputAddress />
          <div id="search-results">
          {searchResults.map((data) => (
            <SearchResults key={data.id} data={data} />
          ))}
          </div>
        </div>
    )
};

export default Aroad;