// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const AdressState = atom({
    key: 'adressState',
    addressOption: '',
    detailedAddress: ''
});

export default AdressState;