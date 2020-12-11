import React, {useState} from "react";
import {useSetRecoilState} from 'recoil';
import axios from 'axios';
import kakaoAuthKey from 'global/KakaoAuthKey';
import EnvSearchState from 'recoilStates/Addroad/searched/EnvSearchState';

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
        params: { query: `${input}`}
    
      }).then( (results) => {
        const itemList = JSON.parse(JSON.stringify(results.data));
        setSearchState(itemList.documents);

      }).catch(error => console.log(error))
      document.getElementById("aroundenv").style.display = 'inline-block';
    //   document.getElementById("road-head").style.display = 'none';
    //   document.getElementById("road-address").style.display = 'none';
    } else {
      window.alert('검색어를 입력해주세요.');
    }
    
  };

  return (
    <div style={{
      display:"flex",
      width:"340px",
      height:"35px"
    }}>
      <input name="just" onChange={onChange} value={input} placeholder={placeholder} style={{
        display:"flex",
        width:'340px',
        height:"35px",
        position:"absolute",
        textIndent:'10px'
      }} required/>
      <button style={{
        display:'block',
        zIndex:"1",
        position:"absolute",
        width:"80px",
        marginLeft:"270px",
        height:"41px",
        padding:'0'
      }} onClick={onClick}> Search </button>
    </div>
  );
};

export default SearchAroundEnv;