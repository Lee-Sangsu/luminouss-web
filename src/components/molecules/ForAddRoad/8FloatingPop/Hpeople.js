import React from "react";
import Dropdown from 'react-dropdown';
import { useState } from "react";

const Hpeople = () => {
  const [peopleKind, setPeopleKind] = useState('');
  const [population, setPopulation] = useState('');
  const [time, setTime] = useState('');
  
  const timeOptions = [
    '평일 오전',
    '평일 오후',
    '주말 오전',
    '주말 오후'
  ];
  const kindOptions = [
    '이',
    '아',
    '어',
    '오'
  ];
  const popOptions = [
    '없었음',
    '1~10명',
    '10~20명',
    '20명 이상'
  ];
  

  const onPeopleKindChange = (event) => {
    setPeopleKind(event.value);
  };
  const onPopulationChange = (event) => {
    event.preventDefault();
    setPopulation(event.value);
  };
  const onTimeChange = (event) => {
    event.preventDefault();
    setTime(event.value);
  };

  return (
      <div style={{
        display:'flex',
        height:'100%',
        flexDirection:'column',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <h4>다녀오신 시간대에 유동 인구는 얼마나 있었나요?</h4>
        <h5>시간대:</h5>
        <Dropdown className='population' options={timeOptions} onChange={onTimeChange} value={time} placeholder='시간대' />
        <h5>가장 많았던 사람들 유형:</h5>
        <Dropdown className='people-kind' options={kindOptions} onChange={onPeopleKindChange} value={peopleKind} placeholder='사람 유형' />
        <h5>봤던 사람의 수:</h5>
        <Dropdown className="populations" options={popOptions} onChange={onPopulationChange} value={population} placeholder='사람 수' />
      </div>
  )
};
export default Hpeople;