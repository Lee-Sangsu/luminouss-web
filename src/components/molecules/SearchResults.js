import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AddressState from 'recoilStates/AddressState';
import axios from 'axios';
import kakaoAuthKey from 'global/KakaoAuthKey';
import AroundSubwayState from 'recoilStates/AroundSubwayState';
import 'components/styles/SearchResultList.css'

const SearchResults = ( {data} ) => {
    const [address, setAddress] = useRecoilState(AddressState);
    const setSubways = useSetRecoilState(AroundSubwayState);

    const onClick = async () => {
        setAddress({
            address_name: data.address_name,
            latitude: data.y,
            longitude: data.x
        });
        
        //백엔드에서 보통 api key들을 함, || 서버에서 데이터 렌더링 후 주던가

        axios.get('https://dapi.kakao.com/v2/local/search/category.json', {
            headers : {
                'Authorization': `KakaoAK ${kakaoAuthKey}`,
                'content-type': 'application/x-www-form-urlencoded'
            },
            params : {
                category_group_code: 'SW8',
                x: address.longitude,
                y: address.latitude,
                size: 2
            } 
        }).then((res) => {
            const subwayList = JSON.parse(JSON.stringify(res.data));
            setSubways(subwayList.documents);
        }).catch(error => console.log(error))


        document.getElementById("search-results").style.display = 'none';
        document.getElementById("road-head").style.display = 'block';
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
            <h5>{data.address_name}</h5>
        </button>
    )
};

export default SearchResults;