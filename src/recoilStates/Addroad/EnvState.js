// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const EnvState = atom({
    key: 'envState',
    default: '',
});

export default EnvState;