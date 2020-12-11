// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const PeopleState = atom({
    key: 'peopleState',
    default: '',
});

export default PeopleState;