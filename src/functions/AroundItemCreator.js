import {
    useSetRecoilState,
  } from 'recoil';
import React, {useState} from 'react';
import AroundEnvListState from 'recoilStates/AroundEnvListState';



let id = 0;
  
function getId() {
   return id++;
}

const AroundItemCreator = () => {
    const [name, setName] = useState('');
 
    const setInfraList = useSetRecoilState(AroundEnvListState);
  
    const addItem = () => {
      setInfraList((oldInfraList) => [
        ...oldInfraList,
        {
          id: getId(),
          text: `${name}`,
        },
      ]);
      setName('');
    };
  
    const onChange = ({target: {name, value}}) => {
      if (name === "name") {
        setName(value);
      }
    };
  
    return (
      <div>
        <input name="address" type="text" value={name} placeholder="이름" onChange={onChange} />
        <button onClick={addItem}>Add</button>
      </div>
    );
}


export default AroundItemCreator;