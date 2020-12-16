// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const AdressState = atom({
    key: 'adressState',
    default: '',
    address_name: '',
    latitude: '',
    longitude: ''
});

export default AdressState;