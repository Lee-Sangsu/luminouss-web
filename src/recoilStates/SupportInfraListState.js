// eslint-disable-next-line
import React from 'react';
import {atom} from 'recoil';

const SupportInfraListState = atom({
    key: 'SupportInfraListState',
    default: [],
});

export default SupportInfraListState;