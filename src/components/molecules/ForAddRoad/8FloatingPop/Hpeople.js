import React from "react";
import Dropdown from 'react-dropdown';
import { useState } from "react";
import {useRecoilState} from 'recoil';
import PeopleState from 'recoilStates/Addroad/PeopleState';

const Hpeople = ({handlePageChange}) => {
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
      <div id="people-container">
        <h4 id='subtitle'>유동인구에 대한 질문입니다.</h4>
        <h5 id='subsubtitle'>시간대:</h5>
        <Dropdown className='population' options={timeOptions} onChange={onTimeChange} value={time} placeholder='시간대' />
        <h5 id='subsubtitle'>가장 많았던 사람들 유형:</h5>
        <Dropdown className='people-kind' options={kindOptions} onChange={onPeopleKindChange} value={peopleKind} placeholder='사람 유형' />
        <h5 id='subsubtitle'>봤던 사람의 수:</h5>
        <Dropdown className="populations" options={popOptions} onChange={onPopulationChange} value={population} placeholder='사람 수' />
        <button id="to-next-page" onClick={() => handlePageChange(10)}>확인</button>
      </div>
  )
};
export default Hpeople;