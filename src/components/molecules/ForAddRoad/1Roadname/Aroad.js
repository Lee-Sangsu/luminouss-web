import React from 'react';
import {
useRecoilValue,
} from 'recoil';
import InputAddress from 'components/molecules/ForAddRoad/1Roadname/InputAddress';
import RoadNameInput from 'components/molecules/ForAddRoad/1Roadname/RoadNameInput';
import SearchedResultState from 'recoilStates/Addroad/searched/SearchedResultState';
import SearchResults from 'components/molecules/ForAddRoad/1Roadname/SearchResults';
import 'components/styles/Addroad/Aroad.css';
const Aroad = ({handlePageChange}) => {
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
          <h3 id="subtitle">새로운 산책로를 검색하고 위치를 추가해주세요</h3>
          <RoadNameInput placeholder="산책로 이름" />
          <InputAddress />
          <div id="search-results">
            {searchResults.slice(0, 5).map((data) => (
              <SearchResults key={data.id} data={data} />
            ))}
          </div>
          <button id="to-next-page" onClick={() => handlePageChange(2)}>확인</button>
        </div>
    )
};

export default Aroad;