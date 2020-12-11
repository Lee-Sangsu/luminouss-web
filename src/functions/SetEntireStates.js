// eslint-disable-next-line
import React from "react";
import { useRecoilValue } from 'recoil';
import WarningState from 'recoilStates/Addroad/WarningState';
import RoadNameState from 'recoilStates/Addroad/RoadNameState';
import FeatureState from 'recoilStates/Addroad/FeatureState';
import InfraListState from 'recoilStates/Addroad/InfraListState';
import SupportInfraListState from 'recoilStates/Addroad/SupportInfraListState';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
import AddressState from 'recoilStates/Addroad/AddressState';
import AroundSubwayState from 'recoilStates/Addroad/AroundSubwayState';
// import firebase from 'global/fbase';


const SetEntireStates = () => {
    const warning = useRecoilValue(WarningState);
    const roadName = useRecoilValue(RoadNameState);
    const feature = useRecoilValue(FeatureState);
    const infraList = useRecoilValue(InfraListState);
    const supportInfraList = useRecoilValue(SupportInfraListState);
    const aroundEnvList = useRecoilValue(AroundEnvListState);
    const address = useRecoilValue(AddressState);
    const aroundSubway = useRecoilValue(AroundSubwayState); 
    // var userUid =  firebase.auth().currentUser.uid;


    const EntireState = {
        roadName: roadName,
        warning: warning,
        feature: feature,
        infraList: infraList,
        supportInfraList: supportInfraList,
        aroundEnvList: aroundEnvList,
        address: address,
        aroundSubway: aroundSubway
    };
    return EntireState;
};

export default SetEntireStates;