import React from 'react';
import {
    useRecoilValue,
} from 'recoil';
import EnvState from 'recoilStates/Addroad/EnvState';
import WaterQuestions from './WaterQuestions';
import FourQ from './FourQ';

const FenceQuestions = () => {
    const env = useRecoilValue(EnvState);
    if (env === '천변' || env === '강변') {
        return (
            <WaterQuestions />
        )
    } else if (env === '공원') {
        return (
            <FourQ firstQ="낙상 위험이 있는 곳에 안전펜스가 설치되어 있나요?"
            secondQ='도랑∙실개천에 안전펜스가 설치되어 있나요?'
            thirdQ="운동하는 공간 주위에 안전펜스가 설치되어 있나요?"
            fourthQ="걷는 길 전체에 안전 펜스가 설치되어 있나요?" />
        )
    } else if (env === '산') {
        return (
            <FourQ firstQ="계단에 손잡이(펜스)가 있나요?"
            secondQ="다리에 손잡이(펜스)가 있나요?"
            thirdQ="낙상 위험이 있는 곳에 안전펜스가 설치되어 있나요?"
            fourthQ="걷는 길 전체에 안전펜스가 설치되어 있나요?" />
        )
    } else if (env === '호수') {
        return (
            <FourQ firstQ="호수 주위에 안전펜스가 설치되어 있나요?"
            secondQ="낙상 위험이 있는 곳에 안전펜스가 설치되어 있나요?"
            thirdQ="자전거 도로 주위에 안전펜스가 설치되어 있나요?"
            fourthQ="걷는 길 전체에 안전펜스가 설치되어 있나요?" />
        )
    } else if (env === '길거리') {
        return (
            <FourQ firstQ="차도와 인도 사이에 펜스가 설치되어 있나요?"
            secondQ="보행에 방해되는 장애물 (공사장, 노점상 등) 주변에 펜스가 설치되어 있나요?"
            thirdQ="안전펜스가 흰지팡이로 체크하기에 쉽게 설치 되어있나요? (예시 사진)"
            fourthQ="걷는 길 전체에 안전펜스가 설치되어 있나요?" />
        )
    } 
};

export default FenceQuestions;