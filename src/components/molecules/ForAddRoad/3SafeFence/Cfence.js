import React from "react";
import {
  useRecoilValue,
} from 'recoil';
import EnvState from 'recoilStates/Addroad/EnvState';
import FenceQuestions from './FenceQuestions';

const Csupport = () => {
    // const supportInfraList = useRecoilValue(SupportInfraListState);
    const env = useRecoilValue(EnvState);
    return (
        <>
        {env ? <>
          <FenceQuestions />
        </>
        : 
        <>
        환경을 먼저 선택해주세요
        </>}
         
        </>
    )
};

export default Csupport;