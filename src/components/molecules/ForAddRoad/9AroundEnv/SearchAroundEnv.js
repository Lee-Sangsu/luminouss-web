import React, {useState} from "react";
import {useSetRecoilState} from 'recoil';
import axios from 'axios';
import kakaoAuthKey from 'global/KakaoAuthKey';
import EnvSearchState from 'recoilStates/Addroad/searched/EnvSearchState';
import swal from 'sweetalert';

const SearchAroundEnv = ( {placeholder} ) => {
    const setSearchState = useSetRecoilState(EnvSearchState);
    const [input, setInput] = useState('');


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
    if (input) {
      axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
            'Authorization': `KakaoAK ${kakaoAuthKey}`,
            'content-type': 'application/x-www-form-urlencoded'
        },
        params: { 
          query: `${input}`
        }
    
      }).then( (results) => {
        const itemList = JSON.parse(JSON.stringify(results.data));
        setSearchState(itemList.documents);

      }).catch(error => console.log(error))
      document.getElementById("aroundenv").style.display = 'inline-block';
    //   document.getElementById("road-head").style.display = 'none';
    //   document.getElementById("road-address").style.display = 'none';
    } else {
      swal('검색어를 입력해주세요.');
    }
    
  };

  return (
    <div id="search-around-env">
      <input id="search-input" name="just" onChange={onChange} value={input} placeholder={placeholder} required/>
      <button id="search-button"  onClick={onClick}> Search </button>
    </div> 
  );
};

export default SearchAroundEnv;