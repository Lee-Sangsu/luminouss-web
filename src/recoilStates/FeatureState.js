// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const FeatureState = atom({
    key: 'featureState',
    default: '',
});

export default FeatureState;