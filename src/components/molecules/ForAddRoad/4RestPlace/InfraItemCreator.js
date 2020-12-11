import {
    useSetRecoilState,
  } from 'recoil';
import React, {useState} from 'react';
import InfraListState from 'recoilStates/Addroad/InfraListState';
import Dropdown from 'react-dropdown';
import 'components/styles/Dropdown.css';
import Checkbox from 'components/atoms/Checkbox';

let id = 0;
  
function getId() {
   return id++;
}

const SupportInfraItemCreator = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [state, setState] = useState(''); // 이 친구도 리코일로 바꿔야 할까..?
    const [checked, setChecked] = useState('');
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

    const checkboxChange = (event) => {
      // event.preventDefault();
      console.log(event.target.value);
    };
  
    return (
      <div>
        <Dropdown options={options} onChange={onSelect} value={state} placeholder="Select an option" />
        <input name="lat" type="text" value={latitude} placeholder="위도" onChange={onChange} />
        <input name="lng" type="text" value={longitude} placeholder="경도" onChange={onChange} />
        <button onClick={addItem}>Add</button>
        <div onChange={checkboxChange}>
          <input type='radio' value="5" name="score"/> 5
          <input type='radio' value="4" name="score" /> 4
          <input type='radio' value="3" name="score" /> 3
          <input type='radio' value="2" name="score" /> 2
          <input type='radio' value="1" name="score" /> 1
        </div>

      </div>
    );
}


export default SupportInfraItemCreator;