import axios from 'axios';
import kakaoAuthKey from 'global/authKey';
import { useSetRecoilState } from 'recoil';
import SearchedResultState from 'recoilStates/SearchedResultState';

export const SearchKeyword = (keyword) => {
    const setSearchState = useSetRecoilState(SearchedResultState);
    axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
            'Authorization': `KakaoAK ${kakaoAuthKey}`,
            'content-type': 'application/x-www-form-urlencoded'
        },
        params: { query: `${keyword}`}
    }
    ).then((res) => setSearchState(res.data)).catch((e) => {
        console.log(e); // occurs Invalid hook call error
    })
};

