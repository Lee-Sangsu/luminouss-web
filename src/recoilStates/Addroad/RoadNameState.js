// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const RoadNameState = atom({
    key: 'roadNameState',
    default: '',
});

export default RoadNameState;