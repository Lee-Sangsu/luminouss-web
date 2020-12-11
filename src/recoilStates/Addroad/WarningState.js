// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const WarningState = atom({
    key: 'warningState',
    default: '',
});

export default WarningState;  