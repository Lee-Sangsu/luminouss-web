import React from "react";
import {useSetRecoilState, useRecoilValue} from 'recoil';
import WarningState from 'recoilStates/WarningState';

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
    <input name="just" onChange={onChange} value={warning} placeholder={placeholder} style={{
      width:'350px',
      height:'100px',
      textIndent: '20px',
      wordBreak:'break-all'
    }} required/>
  </>
);
};

export default WarningInput;