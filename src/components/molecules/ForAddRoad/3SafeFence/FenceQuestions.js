import React from 'react';
import {
    useRecoilValue,
} from 'recoil';
import EnvState from 'recoilStates/Addroad/EnvState';

const FenceQuestions = () => {
    const env = useRecoilValue(EnvState);
    if (env === '천변' || env === '강변') {
        return (
            <>
            천, 강변 질문들
            </>
        )
    } else if (env === '공원') {
        return (
            <>
            공원 질문들
            </>
        )
    } else if (env === '산') {
        return (
            <>
            산 질문들
            </>
        )
    } else if (env === '호수') {
        return (
            <>
            호수 질문들
            </>
        )
    } else if (env === '길거리') {
        return (
            <>
            길거리 질문들
            </>
        )
    } 
};

export default FenceQuestions;