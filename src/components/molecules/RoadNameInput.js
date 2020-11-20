import React, {useState} from "react";
import {useSetRecoilState, useRecoilValue} from 'recoil';
import RoadNameState from 'recoilStates/RoadNameState';
import { SearchKeyword } from 'functions/SearchKeyword';
// import axios from 'axios';
// import kakaoAuthKey from 'global/authKey';
import SearchedResultState from 'recoilStates/SearchedResultState'


const RoadNameInput = ( {placeholder} ) => {
    const setRoadName = useSetRecoilState(RoadNameState);
    const roadName = useRecoilValue(RoadNameState);
    const [fuck, setFuck] = useState('');



    const onChange = (event) => {
      const {
          target: {
              name, value
          }
      } = event;
      if (name === "just") {
        setFuck(value);
        SearchKeyword(value)
      }
  }; 

  return (
    <form>
      <input name="just" onChange={onChange} value={fuck} placeholder={placeholder} required/>
    </form>
  );
};

export default RoadNameInput;