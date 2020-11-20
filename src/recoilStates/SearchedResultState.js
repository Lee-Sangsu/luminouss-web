// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const SearchedResultState = atom({
    key: 'searchedNameState',
    default: [],
});

export default SearchedResultState;