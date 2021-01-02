import {
    useRecoilState,
  } from 'recoil';
import React from 'react';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
import Dropdown from 'react-dropdown';

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const SelectCategory = ({item}) => {
    const [infraList, setInfraList] = useRecoilState(AroundEnvListState);
    const index = infraList.findIndex((listItem) => listItem === item);
    const [category, setCategory] = React.useState('');
    const [input, setInput] = React.useState('');

    const options = ["한식", "양식", "중식", "일식", "아시안", "기타 (직접입력)"];

    const onChange = (event) => {
        setCategory(event.value);

        const newList = replaceItemAtIndex(infraList, index, {
            ...item,
            category: `(${event.value})`,
        });
    
        setInfraList(newList);
    };

    const onClick = () => {
        const newList = replaceItemAtIndex(infraList, index, {
            ...item,
            category: `(${input})`,
        });    
        setInfraList(newList);
    };



    return (<>
        <Dropdown className='restaurant-category' options={options} onChange={onChange} value={category} placeholder='음식점 카테고리' />

        {category === options[options.length-1] ? <>
            <input id="etc-input" onChange={(e) => setInput(e.target.value)} value={input} placeholder="카테고리를 입력해주세요" />
            <button onClick={onClick}>입력</button>
            </>:
            <></>
        }    
    </>);
};

export default SelectCategory;