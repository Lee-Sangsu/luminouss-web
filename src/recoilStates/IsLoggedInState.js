// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const IsLoggedInState = atom({
    key: 'isLoggedInState',
    default: false
});

export default IsLoggedInState;