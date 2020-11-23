import {
    useSetRecoilState,
  } from 'recoil';
import React, {useState} from 'react';
import SupportInfraListState from 'recoilStates/SupportInfraListState';
import Dropdown from 'react-dropdown';
import 'components/styles/Dropdown.css';
import 'components/styles/AddingList.css'

let id = 0;
  
function getId() {
   return id++;
}

const SupportInfraItemCreator = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [state, setState] = useState(''); // 이 친구도 리코일로 바꿔야 할까..?
    const options = [
        "음성유도기", "유도블럭", "점자 표지판", "안전펜스"
    ];
    const onSelect = (event) => {
        setState(event.value);
    };
    const setInfraList = useSetRecoilState(SupportInfraListState);
  
    const addItem = () => {
      setInfraList((oldInfraList) => [
        ...oldInfraList,
        {
          id: getId(),
          text: `${latitude}, ${longitude}`,
          supportInfra: state,
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
        <Dropdown options={options} onChange={onSelect} value={state} placeholder="보조시설 종류" />
        
        <input name="lat" type="text" value={latitude} placeholder="위도" onChange={onChange} />
        <input name="lng" type="text" value={longitude} placeholder="경도" onChange={onChange} />
        <button onClick={addItem}>Add</button>
      </div>
    );
}


export default SupportInfraItemCreator;