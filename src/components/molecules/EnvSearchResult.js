import React from 'react';
import { useSetRecoilState } from 'recoil';
import AroundEnvListState from 'recoilStates/AroundEnvListState';

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
                category_group_name: data.category_group_name
            },]
        );
        
        //백엔드에서 보통 api key들을 함, || 서버에서 데이터 렌더링 후 주던가

        document.getElementById("aroundenv").style.display = 'none';
    };

    return (
        <button onClick={onClick} style={{
            width:"350px",
            textAlign:"start",
            textIndent:"15px",
            backgroundColor:'white',
            // borderBottomWidth:'0px',
            marginTop:'-2px',
            borderRadius:'3px',
            borderColor:'black'
        }}>
            <h3>{data.place_name}</h3>
            <h5>{data.category_group_name}</h5>
            <h5>{data.address_name}</h5>
        </button>

    )
};

export default SearchResults;