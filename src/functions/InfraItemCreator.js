import {
    useSetRecoilState,
  } from 'recoil';
import React, {useState} from 'react';
import InfraListState from 'recoilStates/InfraListState';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


let id = 0;
  
function getId() {
   return id++;
}

const SupportInfraItemCreator = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [state, setState] = useState(''); // 이 친구도 리코일로 바꿔야 할까..?
    const options = [
        "화장실", "계단", "벤치 및 쉬는 공간"
    ];
    const onSelect = (event) => {
        setState(event.value);
    };
    const setInfraList = useSetRecoilState(InfraListState);
  
    const addItem = () => {
      setInfraList((oldInfraList) => [
        ...oldInfraList,
        {
          id: getId(),
          text: `${latitude}, ${longitude}`,
          Infra: state,
        },
      ]);
      setLatitude('');
      setLongitude('');
    };
  
    const onChange = ({target: {name, value}}) => {
      if (name === "lat"){ 
        setLatitude(value);
      } else if (name === "lng") {
        setLongitude(value);
      }
    };
  
    return (
      <div>
        <Dropdown options={options} onChange={onSelect} value={state} placeholder="Select an option" />
        <input name="lat" type="text" value={latitude} placeholder="위도" onChange={onChange} />
        <input name="lng" type="text" value={longitude} placeholder="경도" onChange={onChange} />
        <button onClick={addItem}>Add</button>
      </div>
    );
}


export default SupportInfraItemCreator;