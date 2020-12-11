// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const PavementState = atom({
    key: 'pavementState',
    default: '',
});

export default PavementState;