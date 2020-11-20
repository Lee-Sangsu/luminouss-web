import React from 'react';
import { useRecoilValue } from 'recoil';
import SearchedResultState from 'recoilStates/SearchedResultState';

const SearchResults = () => {
    const searchResults = useRecoilValue(SearchedResultState);
    return (
        <>
            {searchResults ? searchResults.map((res, index) => <li key={index}>{res.address_name} {res.place_name}</li>): <></>}
        </>
    )
};

export default SearchResults;