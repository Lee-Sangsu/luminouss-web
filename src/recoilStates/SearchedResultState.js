// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const SearchedResultState = atom({
    key: 'searchedResultState',
    default: []
    // items: []
});

export default SearchedResultState;