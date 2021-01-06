// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const IsLoggedInState = atom({
    key: 'isLoggedInState',
    default: window.localStorage.getItem('user') || false
    // default: false
});

export default IsLoggedInState;