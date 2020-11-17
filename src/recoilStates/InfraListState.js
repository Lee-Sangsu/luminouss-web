// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const InfraListState = atom({
    key: 'InfraListState',
    default: [],
});

export default InfraListState;