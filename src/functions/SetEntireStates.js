import { useRecoilValue } from 'recoil';
import AddressState from 'recoilStates/Addroad/AddressState';
import AddressArea from 'recoilStates/Addroad/AddressAreaState';
import AroundEnvListState from 'recoilStates/Addroad/AroundEnvListState';
import AroundSubwayState from 'recoilStates/Addroad/AroundSubwayState';
import BenchState from 'recoilStates/Addroad/BenchState';
import BrailleState from 'recoilStates/Addroad/BrailleState';
import EnvState from 'recoilStates/Addroad/EnvState';
import FeatureState from 'recoilStates/Addroad/FeatureState';
import FenceState from 'recoilStates/Addroad/FenceState';
import LeadBlockState from 'recoilStates/Addroad/LeadBlockState';
import PavementState from 'recoilStates/Addroad/PavementState';
import PeopleState from 'recoilStates/Addroad/PeopleState';
import RoadLengthState from 'recoilStates/Addroad/RoadLengthState';
import RoadNameState from 'recoilStates/Addroad/RoadNameState';
import StairsState from 'recoilStates/Addroad/StairsState';
import ToiletState from 'recoilStates/Addroad/ToiletState';
import VoiceState from 'recoilStates/Addroad/VoiceState';
import WarningState from 'recoilStates/Addroad/WarningState';


const SetEntireStates = () => {
    const address = useRecoilValue(AddressState);
    const addressArea = useRecoilValue(AddressArea);
    const aroundEnvList = useRecoilValue(AroundEnvListState);
    const aroundSubway = useRecoilValue(AroundSubwayState); 
    const bench = useRecoilValue(BenchState);
    const braille = useRecoilValue(BrailleState);
    const env = useRecoilValue(EnvState);
    const feature = useRecoilValue(FeatureState);
    const fence = useRecoilValue(FenceState);
    const leadBlock = useRecoilValue(LeadBlockState);
    const pavement = useRecoilValue(PavementState);
    const people = useRecoilValue(PeopleState);
    const length = useRecoilValue(RoadLengthState);
    const roadName = useRecoilValue(RoadNameState);
    const stairsFeature = useRecoilValue(StairsState);
    const toilet = useRecoilValue(ToiletState);
    const voiceInduction = useRecoilValue(VoiceState);
    const warning = useRecoilValue(WarningState);

    var voiceInductionScore = 0;
    var leadBlockScore = 0;
    var brailleScore = 0;
    var fenceScore = 0;


    var y;
    for (y in fence) {
        fenceScore += fence[y];
    }

    var x;
    // leadBlockScore = leadBlock.first + leadBlock.second + leadBlock.third + leadBlock.fourth  + leadBlock.fifth;
    for(x in leadBlock){
        leadBlockScore += leadBlock[x];
    }


    if (braille >= 5) {
        brailleScore = 10;
    } else {
        brailleScore = braille * 2;
    }

    if (voiceInduction >= 5) {
        voiceInductionScore = 10;
    } else {
        voiceInductionScore = voiceInduction * 2;
    }

    var walking_people;
    if (people.population === '없었습니다') {
        walking_people = `${people.time}에 유동인구가 ${people.population}`
    } else {
        walking_people = `${people.time}에 ${people.peopleKind} ${people.population}`
    }

    /* 카테고리랑 place_name 합쳐야 함.
    var newAroundEnvList = [];

    aroundEnvList.forEach((value) => {
        const arrObj = {
            ...value,
            : 

        }
    }) 
    */
    
    // var userUid =  firebase.auth().currentUser.uid;
    
    const EntireState = {
        road_name: roadName,
        road_env: env,
        entire_length: length,
        address_name: address.address_name,
        address_area: addressArea,
        latitude: address.latitude,
        longitude: address.longitude,
        around_subway: aroundSubway,
        voice_induction: voiceInductionScore,
        side_walk_block: leadBlockScore,
        braille_notice: brailleScore,
        safety_fence: fenceScore,
        pavement: pavement,
        stair_feature: stairsFeature,
        warning: warning,
        toilet: toilet,
        bench_and_rest: bench,
        walking_people: walking_people,
        feature:  feature,
        around_env_list:  aroundEnvList
    };
    return EntireState;
};

export default SetEntireStates;