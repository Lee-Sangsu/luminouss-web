import {
    useRecoilState,
  } from 'recoil';
import React from 'react';
import SupportInfraListState from 'recoilStates/Addroad/SupportInfraListState';

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const SupportInfaItem = ({item}) => {
    const [infraList, setInfraList] = useRecoilState(SupportInfraListState);
    const index = infraList.findIndex((listItem) => listItem === item);
  
    const editItemText = ({target: {value}}) => {
      const newList = replaceItemAtIndex(infraList, index, {
        ...item,
        text: value,
      });
  
      setInfraList(newList);
    };
  
  
    const deleteItem = () => {
      const newList = removeItemAtIndex(infraList, index);
  
      setInfraList(newList);
    };
  
  return (
    <div style={{width:'700px'}}>
      <h4 style={{display:'inline-block', marginRight:'10px'}}>{item.supportInfra}</h4>
      <input style={{display:'inline-block'}} type="text" value={item.text} onChange={editItemText} />
      <button style={{display:'inline-block'}} onClick={deleteItem}>X</button>
    </div>
  );
};


export default SupportInfaItem;