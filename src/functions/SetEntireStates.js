// eslint-disable-next-line
import React from "react";
import { useRecoilValue } from 'recoil';
import WarningState from '../recoilStates/WarningState';
import RoadNameState from '../recoilStates/RoadNameState';
import FeatureState from '../recoilStates/FeatureState';
import InfraListState from '../recoilStates/InfraListState';
import SupportInfraListState from '../recoilStates/SupportInfraListState';
import AroundEnvListState from '../recoilStates/AroundEnvListState';
import AddressState from '../recoilStates/AddressState';
import AroundSubwayState from '../recoilStates/AroundSubwayState';



const SetEntireStates = () => {
    const warning = useRecoilValue(WarningState);
    const roadName = useRecoilValue(RoadNameState);
    const feature = useRecoilValue(FeatureState);
    const infraList = useRecoilValue(InfraListState);
    const supportInfraList = useRecoilValue(SupportInfraListState);
    const aroundEnvList = useRecoilValue(AroundEnvListState);
    const address = useRecoilValue(AddressState);
    const aroundSubway = useRecoilValue(AroundSubwayState);


    


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