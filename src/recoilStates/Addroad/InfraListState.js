// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const InfraListState = atom({
    key: 'infraListState',
    default: [],
});

export default InfraListState;