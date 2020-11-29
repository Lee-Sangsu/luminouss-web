import React, {useRef} from "react";
import { Link, useHistory } from "react-router-dom";
import "components/styles/Home.css"
// import firebase from "global/fbase";
import useH1FadeIn from 'hooks/useH1FadeIn';
import useH3FadeIn from 'hooks/useH3FadeIn';
import onSoundBtnClick from 'functions/onSoundBtnClick';

const Home  = ({ isLoggedIn }) => {
    //prop 바뀌면 리렌더링 isLoggedIn state 바뀜
    const history = useHistory();
    //login 안 된 경우, 로그인 필요합니다 알러트 띄우기
    const onRoadInfoClick = (event) => {
        event.preventDefault();
        if (isLoggedIn){
            history.push('/add-road-info');
        } else {
            window.alert("산책로 정보를 추가하려면 로그인이 필요합니다.");
            history.push('sign-in');
        }
    };
    

    const h1FadeIn = useH1FadeIn();
    const h3FadeIn = useH3FadeIn();

    
    const divRef = useRef(null);
    const imgRef = useRef();

    const moveScroll = () => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const firstmoveScroll = () => {
        imgRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    
    
    // const [arr, setArr]= useState([]);

    // const getWalkRoadInfo = async () => {
    //         const res = await firebase.firestore().collection('WalkRoad').get()
    
    //         res.forEach((doc) => {
    //             const arrObj = {
    //                 ...doc.data(),
    //                 id: doc.id,
    //             };
    //             setArr((prev) => [arrObj, ...prev]);
    //         });
    // };
     
    // // 화면 켜질때 딱 한번만 array에 담는걸 어떻게 할까.. 
    // useEffect(() => {
    //     getWalkRoadInfo();
    // }, [])

    return (
        <>
            <div id="first-container" style={{
                display: 'flex',
                flexDirection:'row',
                height: `${window.innerHeight - 140}px`,
                flexWrap:'wrap',
                width:window.innerWidth,
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
            <div ref={imgRef} className="test">
                <div className="first-test-box">
                    <h4 id='first-h4'>
{`이곳을 눌러 
소리를 들어보세요 ->`
}</h4>    
                    <button id="first-sound-btn" onClick={onSoundBtnClick} />
                </div> 
                <div id="second-test-box">
                    <h4 id='second-h4'>
{`이곳을 눌러 
소리를 들어보세요 ->`
}</h4>    
                    <button id="second-sound-btn" onClick={onSoundBtnClick} />
                </div> 
                <div id="third-test-box">
                    <h4 id='third-h4'>
{`이곳을 눌러 
소리를 들어보세요 ->`
}</h4>    
                    <button id="third-sound-btn" onClick={onSoundBtnClick} />
                </div> 
                {/* <img src={require('images/down-arrow.png').default} alt='스크롤을 내려보세요' id='down-arrow' /> */}
                <h5 onClick={moveScroll} id="down-arrow">테스트가 종료되었습니다</h5>
            </div>
            <div ref={divRef} style={{
                display: 'flex',
                width:window.innerWidth,
                height:'150px',
                alignItems:'center'
            }}>
                <h4 style={{
                    marginRight:'15%',
                    marginLeft: "15%",
                    marginTop:'0',
                    fontSize:'20px',
                    whiteSpace: 'pre',
                    fontWeight:'500'
                }}>
{`
여러분이 입력해주신 산책로 정보는,
저희의 솔루션인 모바일 앱 워크위드를 
통해 시각장애인에게 제공됩니다`}
                </h4>
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
                            fontSize: '15px',
                            whiteSpace:'pre',
                            padding:'20% 0',
                            marginBlockEnd:'0',
                            lineHeight:'300%'
                        }}>
{`산책로 정보 추가하기 ->`}
                        </h4>
                    </Link>
                </div>
            </div>
            <div id="semi-title">
                <h2 id='semi-title-text'>시각장애인의 산책 한걸음이, 자립 한걸음으로.</h2>
            </div>
            <div id='semi-second-title'>
                <h4 id='semi-second-first-title'>
{`
 시각장애인들은 산책을 즐겨하지만, 
 산책로의 안전펜스, 유도블럭, 점자표지판 등 
 보조시설의 부재 때문에 불편함을 겪고 있습니다. 
`}
                </h4>
                <h3 id='semi-second-second-title'>
                    저희는 ‘시각장애인의 불편한 산책 경험’을 해결하려 합니다.
                </h3>
                <Link to='/about-luminouss' id='link-to-about'>루미너스 팀 더 알아보기</Link>
            </div>
        
        </>
    );
};

export default Home;