import React from "react";
import {useRecoilState, useRecoilValue} from 'recoil';
import AddressAreaState from 'recoilStates/Addroad/AddressAreaState';
import AddressState from 'recoilStates/Addroad/AddressState';
import AddressArea from './AddressArea';

let id = 1;
  
function getId() {
   return id++;
}

const InputAddress = () => {
    const add = useRecoilValue(AddressState);
    const [address, setAddress] = useRecoilState(AddressAreaState);
    const [newAdd, setNewAdd] = React.useState('');

    const onChange = (event) => {
        event.preventDefault();
        setNewAdd(event.target.value);
    };

    const onClick = () => {
        if (newAdd) {
            setAddress((oldList) => [
                ...oldList,  {
                    id: getId(),
                    area: newAdd
                }
            ]);
        }
    };


    //isEmpty check 해서 state ''면 에러 배텅
    return (
        <div id='road-res-entire'>
            <h3 id="road-head">산책로 위치: </h3>
            <h5 id='road-address'>{add.address_name}</h5>
            {address[0] ? (
                <>
                <h5 id='address-area'> {`산책로가 ${address[0].area} 외에 다른 행정 구역에 걸쳐져 있나요?`} </h5>
                <div>
                    <input type="text" onChange={onChange} value={newAdd} />
                    <button onClick={onClick}>추가하기</button>
                </div>

                {address.map((add) => (
                    <AddressArea key={add.id} item={add} />
                ))}
                </>) : (<></>
            )}

        </div>
    )
};

export default InputAddress;