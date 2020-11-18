import React from "react";
import {useSetRecoilState, useRecoilValue} from 'recoil';
import FeatureState from 'recoilStates/FeatureState';

const FeaturesInput = ( {placeholder} ) => {
    const setFeature = useSetRecoilState(FeatureState);
    const feature = useRecoilValue(FeatureState);

    const onChange = (event) => {
      const {
          target: {
              name, value
          }
      } = event;
      if (name === "just") {
        setFeature(value);
      }
  }; 
  return (
    <>
      <input name="just" onChange={onChange} value={feature} placeholder={placeholder} required/>
    </>
  );
};

export default FeaturesInput;