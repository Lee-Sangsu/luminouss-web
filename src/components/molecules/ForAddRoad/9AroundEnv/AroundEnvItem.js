import {
    useRecoilState,
  } from 'recoil';
import React from 'react';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';


function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const AroundEnvItem = ({item}) => {
    const [infraList, setInfraList] = useRecoilState(AroundEnvListState);
    const index = infraList.findIndex((listItem) => listItem === item);
  
  
    const deleteItem = () => {
      const newList = removeItemAtIndex(infraList, index);
  
      setInfraList(newList);
    };
  
  return (
    <div style={{width:'700px'}}>
      <h4 style={{display:'inline-block', marginRight:'10px'}}>{item.place_name}</h4>
      <button style={{display:'inline-block'}} onClick={deleteItem}>X</button>
    </div>
  );
};


export default AroundEnvItem;