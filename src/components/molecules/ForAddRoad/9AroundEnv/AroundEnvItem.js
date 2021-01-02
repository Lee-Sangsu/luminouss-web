import {
  useRecoilState,
} from 'recoil';
import React from 'react';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
import SelectCategory from './SelectCategory';

function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const AroundEnvItem = ({item}) => {
    const [infraList, setInfraList] = useRecoilState(AroundEnvListState);
    const index = infraList.findIndex((listItem) => listItem === item);


    const deleteItem = () => {
      const newList = removeItemAtIndex(infraList, index);
      setInfraList(newList);
    };
  
  return (
    <div style={{width:'700px'}}>
      <h4 style={{display:'inline-block', marginRight:'10px'}}>{`${item.category_group_name} ${item.place_name} ${item.category}`}</h4>
      <button style={{display:'inline-block'}} onClick={deleteItem}>X</button>
      {item.category_group_name === "음식점" ? <SelectCategory item={item} /> : <></>}
    </div>
  );
};


export default AroundEnvItem;