import React from "react";
import {useRecoilState} from 'recoil';
import FeatureState from 'recoilStates/Addroad/FeatureState';

const FeaturesInput = ( {placeholder} ) => {
    const [feature, setFeature] = useRecoilState(FeatureState);


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
      <input name="just" onChange={onChange} value={feature} placeholder={placeholder} style={{
        width:'350px',
        height:'60px',
        textIndent: '20px',
        wordBreak:'break-all'
      }} required/>
    </>
  );
};

export default FeaturesInput;