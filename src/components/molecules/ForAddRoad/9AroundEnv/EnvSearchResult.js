import React from 'react';
import { useSetRecoilState } from 'recoil';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';

let id = 0;
  
function getId() {
   return id++;
}


const SearchResults = ( {data} ) => {
    const setEnvList = useSetRecoilState(AroundEnvListState);

    const onClick = () => {
        setEnvList((oldList) => [
            ...oldList,
            {
                id: getId(),
                place_name: data.place_name,
                address_name: data.address_name,
                latitude: data.y,
                longitude: data.x,
                category_group_name: data.category_group_name,
                category:''
            },]
        );
        
        //백엔드에서 보통 api key들을 함, || 서버에서 데이터 렌더링 후 주던가

        document.getElementById("aroundenv").style.display = 'none';
    };

    const [mouseIn, setMouseIn] = React.useState(false);
    
    const colorThis =() => {
        setMouseIn(true);
    };

    const backColor =() => {
        setMouseIn(false);
    };

    return (
        <button id="item-btn" onClick={onClick} onMouseEnter={colorThis} onMouseLeave={backColor} style={{
            backgroundColor: mouseIn ? 'white' : 'rgba(196, 196, 196, 1)',
            cursor: mouseIn ? 'pointer': 'unset',
        }}>
            <div id="envitem-data">
                <h3>{data.place_name}</h3>
                <h5 id="envitem-data-h5">{data.category_group_name}</h5>
            </div>
            <h5>{data.address_name}</h5>
        </button>

    )
};

export default SearchResults;