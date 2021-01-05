import React from "react";
import {useSetRecoilState, useRecoilValue} from 'recoil';
import WarningState from 'recoilStates/Addroad/WarningState';

const WarningInput = ( {placeholder} ) => {
  const setWarning = useSetRecoilState(WarningState);
  const warning = useRecoilValue(WarningState);

  const onChange = (event) => {
    const {
        target: {
            name, value
        }
    } = event;
    if (name === "just") {
      setWarning(value);
    }
}; 
return (
  <>
    <textarea name="just" onChange={onChange} value={warning} placeholder={placeholder} id='feature-input' required/>
  </>
);
};

export default WarningInput;