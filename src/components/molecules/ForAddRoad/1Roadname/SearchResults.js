import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AddressState from 'recoilStates/Addroad/AddressState';
import axios from 'axios';
import kakaoAuthKey from 'global/KakaoAuthKey';
import AroundSubwayState from 'recoilStates/Addroad/AroundSubwayState';
import 'components/styles/Addroad/SearchResultList.css'

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
                radius: 1500,
                size: 2
            } 
        }).then((res) => {
            const subwayList = JSON.parse(JSON.stringify(res.data));
            setSubways(subwayList.documents);
        }).catch(error => console.log(error))


        document.getElementById("search-results").style.display = 'none';
        document.getElementById("road-res-entire").style.display = 'block';
        document.getElementById("road-head").style.display = 'block';
        document.getElementById("road-address").style.display = 'block';
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
            <h4 id='place-h4'>{data.place_name}</h4>
            <h6 id='place-h6'>{data.address_name}</h6>
        </button>
    )
};

export default SearchResults;