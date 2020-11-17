import {
    useSetRecoilState,
  } from 'recoil';
import React, {useState} from 'react';
import AroundEnvListState from 'recoilStates/AroundEnvListState';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


let id = 0;
  
function getId() {
   return id++;
}

const AroundItemCreator = () => {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [state, setState] = useState(''); // 이 친구도 리코일로 바꿔야 할까..?
    const options = [
        "음식점", "카페", "랜드마크"
    ];
    const onSelect = (event) => {
        setState(event.value);
    };
    const setInfraList = useSetRecoilState(AroundEnvListState);
  
    const addItem = () => {
      setInfraList((oldInfraList) => [
        ...oldInfraList,
        {
          id: getId(),
          text: `${address}, ${name}`,
          supportInfra: state,
        },
      ]);
      setAddress('');
      setName('');
    };
  
    const onChange = ({target: {name, value}}) => {
      if (name === "address"){ 
        setAddress(value);
      } else if (name === "name") {
        setName(value);
      }
    };
  
    return (
      <div>
        <Dropdown options={options} onChange={onSelect} value={state} placeholder="Select an option" />
        <input name="address" type="text" value={address} placeholder="이름" onChange={onChange} />
        <input name="name" type="text" value={name} placeholder="주소" onChange={onChange} />
        <button onClick={addItem}>Add</button>
      </div>
    );
}


export default AroundItemCreator;