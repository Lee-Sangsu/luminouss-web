import React from "react";
import {useRecoilState} from 'recoil';
import PeopleState from 'recoilStates/PeopleState';

const PeopleInput = ( {placeholder} ) => {
    const [people, setPeople] = useRecoilState(PeopleState);


    const onChange = (event) => {
      const {
          target: {
              name, value
          }
      } = event;
      if (name === "just") {
        setPeople(value);
      }
  }; 
  return (
    <>
      <input name="just" onChange={onChange} value={people} placeholder={placeholder} style={{
        width:'350px',
        height:'60px',
        textIndent: '20px',
        wordBreak:'break-all'
      }} required/>
    </>
  );
};

export default PeopleInput;