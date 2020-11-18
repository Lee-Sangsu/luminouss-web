import React, { useState } from "react";

const JustInput = ( {placeholder} ) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
      const {
          target: {
              name, value
          }
      } = event;
      if (name === "just") {
        setValue(value);
      }
  }; 
  return (
    <>
      <input name="just" onChange={onChange} value={value} placeholder={placeholder} required/>
    </>
  );
};

export default JustInput;