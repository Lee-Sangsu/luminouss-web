import React from "react";
import {useSetRecoilState, useRecoilValue} from 'recoil';
import RoadNameState from 'recoilStates/RoadNameState';

const RoadNameInput = ( {placeholder} ) => {
    const setRoadName = useSetRecoilState(RoadNameState);
    const roadName = useRecoilValue(RoadNameState);

    const onChange = (event) => {
      const {
          target: {
              name, value
          }
      } = event;
      if (name === "just") {
        setRoadName(value);
      }
  }; 
  return (
    <>
      <input name="just" onChange={onChange} value={roadName} placeholder={placeholder} required/>
    </>
  );
};

export default RoadNameInput;