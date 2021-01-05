import React from "react";
import {useRecoilState} from 'recoil';
import FeatureState from 'recoilStates/Addroad/FeatureState';

const FeaturesInput = ( ) => {
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
      <textarea name="just" onChange={onChange} value={feature}  id='feature-input' required/>
    </>
  );
};

export default FeaturesInput;