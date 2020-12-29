import React from 'react';
import { Link } from "react-router-dom";
import useH1FadeIn from 'hooks/useH1FadeIn';
import useH3FadeIn from 'hooks/useH3FadeIn';
import firebase from 'global/fbase';


const FirstIntroduction = ({ onRoadInfoClick, firstmoveScroll }) => {
    // 글자들 페이드인 효과
    const h1FadeIn = useH1FadeIn();
    const h3FadeIn = useH3FadeIn();

    // const [downloadUrl, setDownloadUrl] = React.useState('');

    const downloadPdf = async () => {
        try {
            const storage = firebase.storage();
            const storageRef = storage.refFromURL('gs://luminouss-web.appspot.com/Interview.pdf');
            const url = await storageRef.getDownloadURL();
            
            const a = document.createElement('a');
            a.href= url;
            a.setAttribute('download', true); 
            a.click();
        } catch(e){console.log(e);}
    };
    return (
        <>
        <div id="first-container" style={{
                display: 'flex',
                flexDirection:'row',
                height: `${window.innerHeight - 140}px`,
                flexWrap:'wrap',
                width:'100%',
                backgroundColor:'#EFEFEF',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <div style={{
                    display:'inline-flex',
                    flexDirection:"column",
                    flexWrap:'wrap',
                    height: `${window.innerHeight / 2}px`,
                    justifyContent:'center',
                    marginRight:'15%',
                    marginLeft: "15%",
                }}>
                    <h1 {...h1FadeIn}>
                        {
                        `시각장애인의 
눈과 발이 되어주세요.`}
                    </h1>
                    <h3 {...h3FadeIn}>
                        {`
산책로 정보를 입력하시면, 
여가활동이 어려운 시각장애인에게
다양하고 편안한 산책 경험을 제공할 수 있습니다.`}
                    </h3>
                </div>

                <div className="linkBox" style={{
                    display:'inline-block'
                }}>
                    <Link to="/add-road-info" onClick={onRoadInfoClick} style={{
                        display: 'inline-block',
                        color: 'black',
                        textDecoration: 'none',
                        border: '3px solid black',
                        borderRadius: '20px',
                        textAlign: 'center',
                        padding: '0px 80px',
                        width:'53%'
                    }}>
                        <h4 style={{
                            fontSize: '18px',
                            whiteSpace:'pre',
                            padding:'112% 0',
                            marginBlockEnd:'0',
                            lineHeight:'300%'
                        }}>
{`이곳을 눌러
정보를 추가해주세요`}
                        </h4>
                    </Link>
                <button onClick={downloadPdf}>산책로 정보 가이드 다운로드</button>
                </div>
            </div>
            <div style={{
                display:'flex',
                height:'65px',
                flexDirection:'column',
                width:window.innerWidth,
                backgroundColor:'#EFEFEF',
                justifyContent:'flex-start',
                alignItems:'center'
            }}>
                <h5 onClick={firstmoveScroll} style={{
                    fontSize:'15px',
                    margin:'0',
                    cursor:'pointer'
                }}>이곳을 눌러 워크위드를 체험해보세요</h5>
                <img onClick={firstmoveScroll} src={require('images/down-arrow.png').default} alt='스크롤을 내려보세요' style={{
                    paddingTop:'3px',
                    paddingBottom: '0',
                    height:'30px',
                    width:'65px',
                    cursor:'pointer'
                }} />
            </div>
            </>
        
    )
};

export default FirstIntroduction;
