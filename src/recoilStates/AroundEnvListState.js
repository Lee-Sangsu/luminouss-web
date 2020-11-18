// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const AroundEnvListState = atom({
    key: 'aroundEnvListState',
    default: [],
});

export default AroundEnvListState;