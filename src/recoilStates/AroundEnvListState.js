// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const AroundEnvListState = atom({
    key: 'AroundEnvListState',
    default: [],
});

export default AroundEnvListState;