// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const AdressState = atom({
    key: 'adressState',
    default: '',
    address_name: '',
    latitude: '',
    longitude: '',
    address_area: []
});

export default AdressState;