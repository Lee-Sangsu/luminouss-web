// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const InitializeState = atom({
    key: 'initializeState',
    default: false
});

export default InitializeState;