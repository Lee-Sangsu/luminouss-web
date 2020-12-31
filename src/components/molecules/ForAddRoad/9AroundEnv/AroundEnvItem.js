import {
    useRecoilState,
  } from 'recoil';
import React from 'react';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
import Dropdown from 'react-dropdown';


function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const AroundEnvItem = ({item}) => {
    const [infraList, setInfraList] = useRecoilState(AroundEnvListState);
    const index = infraList.findIndex((listItem) => listItem === item);

    const options = ["한식", "양식", "중식", "일식", "아시안", "기타 (직접입력)"];

    const [category, setCategory] = React.useState('');
    const onSelect = (event) => {
      setCategory(event.value);

      const newList = replaceItemAtIndex(infraList, index, {
        ...item,
        category: `(${event.value})`,
      });
  
      setInfraList(newList);
    };

    const deleteItem = () => {
      const newList = removeItemAtIndex(infraList, index);
      setInfraList(newList);
    };
  
  return (
    <div style={{width:'700px'}}>
      <h4 style={{display:'inline-block', marginRight:'10px'}}>{`${item.category_group_name} ${item.place_name} ${item.category}`}</h4>
      <button style={{display:'inline-block'}} onClick={deleteItem}>X</button>
      {item.category_group_name === "음식점" ? <Dropdown className='restaurant-category' options={options} onChange={onSelect} value={category} placeholder='음식점 카테고리' /> : <></>}
    </div>
  );
};


export default AroundEnvItem;