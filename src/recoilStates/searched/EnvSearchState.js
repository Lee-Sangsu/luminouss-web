// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const EnvSearchState = atom({
    key: 'envSearchState',
    default: [],
});

export default EnvSearchState;