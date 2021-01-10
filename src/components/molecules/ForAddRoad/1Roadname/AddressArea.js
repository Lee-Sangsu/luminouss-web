import {
    useRecoilState,
  } from 'recoil';
import React from 'react';
import AddressAreaState from 'recoilStates/Addroad/AddressAreaState';

function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const AddressArea = ({item}) => {
    const [address, setAddress] = useRecoilState(AddressAreaState);
    const index = address.findIndex((listItem) => listItem === item);
  
  
    const deleteItem = () => {
        if(index ===0 ){
            alert('이 구역은 삭제할 수 없습니다.');
        } else {
            const newList = removeItemAtIndex(address, index);
            setAddress(newList);
        }
    };
  
  return (
    <div id="add-area">
      <h4 id="item-area">{item.area}</h4>
      <button id="delete-item-btn" onClick={deleteItem}>X</button>
    </div>
  );
};


export default AddressArea;