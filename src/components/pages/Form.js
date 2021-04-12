import React from 'react';
import firebase from 'global/fbase';
import swal from 'sweetalert';
import * as uuid from 'uuid';

const Form = () => { 
    const [name, setName] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [roadName, setRoadName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
    
    const onChange = (event) => {
        // event.preventDefault();
        if (event.target.name === "name") {
            setName(event.target.value);
        } else if (event.target.name === "place") {
            setPlace(event.target.value);
        } else if (event.target.name === "road") {
            setRoadName(event.target.value);
        } else if (event.target.name === "date") {
            setDate(event.target.value);
        } else if (event.target.name === "tel") {
            setPhoneNum(event.target.value);
        }
    };
    
    const goToDownload = async () => {
        try {
            const storage = firebase.storage();
            const storageRef = storage.refFromURL('gs://luminouss-web.appspot.com/산책로 답사 가이드북.pdf');
            const url = await storageRef.getDownloadURL();
            
            const a = document.createElement('a');
            a.href= url;
            a.setAttribute('download', true); 
            a.click();
        } catch(e){console.log(e);}
    };

    const registerInputer = async () => {
        try {
            await firebase.firestore().collection("InputRegister").doc(uuid.v4()).set({
                name,
                place,
                roadName,
                date,
                phoneNum
            });
        } catch (e) {
            console.log(e);
        }
    };

    const formSubmit = () => {
        swal("산책로 가이드를 제공받으시겠습니까?", {
            buttons: {
                catch: {
                    text:"네",
                    value: "catch"
                },
                cancel: "아니요",
            }
        })
        .then((provide) => {
            if (provide) {
                if(name && place && roadName && date){
                    registerInputer();
                    goToDownload();
                } else {
                    swal("입력하신 정보가 충분하지 않습니다.", {
                        icon: "error",
                    });
                }
            } else {
                if(name && place && roadName && date){
                    registerInputer();
                    swal("신청이 완료되었습니다", {
                        icon: "success",
                    });
                } else {
                    swal("입력하신 정보가 충분하지 않습니다.", {
                        icon: "error",
                    });
                }
                //신청 내용을 어따 넘기지?
            }
        });
    }

    return (
        <div id="form-container" >
            <div id="form-header" >
                <h1 id="form-header-h1" >루미너스 산책로 답사 신청서</h1>
                <pre id="form-header-pre" >
{`저희 루미너스는 시각장애인들이 다양한 곳에서 안전한 산책을 할 수 있도록 산책로 정보를 모아 시각장애인 앱을 제작합니다. 
산책로 답사는 시각장애인들에게 다양한 산책로에 대한 정보를 제공하기 위해 꼭 필요합니다.
여러분들이 입력하는 산책로 정보들이 모여 시각장애인들의 풍성한 여가생활을 만듭니다.  
원하는 시간대에, 가고싶은 산책로 산책을 하며 산책로 정보를 입력해주시면 됩니다. 큰 부담없이 참여해주세요!

산책로 답사 신청 설문에 산책로 정보 입력 :`} <a href="https://luminouss.kr/#/">https://luminouss.kr/</a>{`

산책로 답사 가이드가 준비되어 있으니 가이드를 참고하여 산책로 답사를 진행해주시기 바랍니다. 
가이드 다운로드: `}
<a href="https://luminouss.kr/#/download-our-guide">https://luminouss.kr/#/download-our-guide</a>
                </pre>
            </div>
            
            <div id="form-questions">
                <h3 id="form-question">신청자의 성함은 무엇인가요? (이벤트에 함께 참여하는 친구분이 있다면 친구분 성함도 적어주세요.)</h3>
                <input id="form-input" style={{
                    width: window.innerWidth < 500 ? '100%' : '50%',
                }} name="name" type="text" value={name} onChange={onChange} placeholder="내 답변" />
            </div>

            <div id="form-questions">
                <h3 id="form-question">현 거주 지역은 어디인가요? 예) 서울특별시</h3>
                <input id="form-input" style={{
                    width: window.innerWidth < 500 ? '100%' : '50%',
                }} name="place" type="text" value={place} onChange={onChange} placeholder="내 답변" />
            </div>

            <div id="form-questions">
                <h3 id="form-question">
{`천변, 강변, 호수, 공원, 길거리(ex.인사동길) 등이 산책로에 포함됩니다.
아파트 내 산책로는 조사 대상에 포함되지 않습니다.`
}               </h3>
            </div>

            <div id="form-questions">
                <h3 id="form-question">답사할 산책로 이름을 알려주세요. 예) 서울특별시 북서울 꿈의 숲</h3>
                <input id="form-input" style={{
                    width: window.innerWidth < 500 ? '100%' : '50%',
                }} name="road" type="text" value={roadName} onChange={onChange} placeholder="내 답변" />
            </div>
            <div id="form-questions">
                <h3 id="form-question">산책로 답사를 마무리(정보 입력까지) 할 날짜를 선택해주세요.</h3>
                <input id="form-input" style={{
                    width: window.innerWidth < 500 ? '100%' : '50%',
                }} name="date" type="date" value={date} onChange={onChange} placeholder="내 답변" />
            </div>
            <div id="form-questions">
                <h3 id="form-question">전화번호를 제공해주시면 해당 번호로 기프티콘을 드리겠습니다.</h3>
                <input id="form-input" style={{
                    width: window.innerWidth < 500 ? '100%' : '50%',
                }} name="tel" type="tel" value={phoneNum} onChange={onChange} placeholder="010-xxxx-xxxx" />
            </div>

            <div id="form-questions">
                <h3 id="form-question">
{`산책로 정보는 루미너스 웹사이트 (`}<a href="https://luminouss.kr/#/">https://luminouss.kr/#/</a>{`)의
 '산책로 정보 추가하기' 버튼을 눌러 입력해주세요.`
}               </h3>
            </div>
            <div id="form-submit-container">
                <button id="form-submit" onClick={formSubmit}>제출</button>
            </div>

        </div>
    )
};

export default Form;