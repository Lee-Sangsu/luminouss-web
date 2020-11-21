import React from "react";
import {useSetRecoilState, useRecoilState} from 'recoil';
import RoadNameState from 'recoilStates/RoadNameState';
import axios from 'axios';
import kakaoAuthKey from 'global/KakaoAuthKey';
import SearchedResultState from 'recoilStates/SearchedResultState'


const RoadNameInput = ( {placeholder} ) => {
    const setSearchState = useSetRecoilState(SearchedResultState);
    const [input, setInput] = useRecoilState(RoadNameState);


    const onChange = (event) => {
      const {
          target: {
              name, value
          }
      } = event;
      if (name === "just") {
        setInput(value);
        // SearchKeyword(value);
      }
  }; 

  const onClick = async ()  => {
    axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
          'Authorization': `KakaoAK ${kakaoAuthKey}`,
          'content-type': 'application/x-www-form-urlencoded'
      },
      params: { query: `${input}`}
    }).then( (results) => {

      const itemList = JSON.parse(JSON.stringify(results.data));
      setSearchState(itemList.documents);
    }).catch(error => console.log(error))
  };

  return (
    <div>
      <input name="just" onChange={onChange} value={input} placeholder={placeholder} required/>
      <button onClick={onClick}> Search </button>
    </div>
  );
};

export default RoadNameInput;