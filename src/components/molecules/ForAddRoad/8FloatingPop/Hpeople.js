import React from "react";
import Dropdown from 'react-dropdown';
import { useState } from "react";
import {useRecoilState} from 'recoil';
import PeopleState from 'recoilStates/Addroad/PeopleState';

const Hpeople = () => {
  const [people, setPeople] = useRecoilState(PeopleState);
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
    '데이트 하는 커플들이',
    '산책이나 운동을 하러 나온 사람들이'
  ];
  const popOptions = [
    '없었습니다.',
    '1~10명 있었습니다.',
    '10~20명 있었습니다.',
    '20명 이상 있었습니다.'
  ];
  

  const onPeopleKindChange = (event) => {
    setPeople({
      ...people, peopleKind: `${event.value}`
    });
    setPeopleKind(event.value);
  };
  const onPopulationChange = (event) => {
    setPeople({
      ...people, population: `${event.value}`
    });
    setPopulation(event.value);
  };
  const onTimeChange = (event) => {
    setPeople({
      ...people, time: `${event.value}` 
    });
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