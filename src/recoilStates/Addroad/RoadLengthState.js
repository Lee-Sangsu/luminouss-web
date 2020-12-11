// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const RoadLengthState = atom({
    key: 'roadLengthState',
    default: '',
});

export default RoadLengthState;