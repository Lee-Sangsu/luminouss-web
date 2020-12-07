import React from 'react';
import { Link } from "react-router-dom";
import Footer  from 'components/molecules/ForHome/Footer';

const SecondIntroduction = ({ divRef, onRoadInfoClick }) => { 
    return (
        <>
        <div ref={divRef} style={{
                display: 'flex',
                width:window.innerWidth,
                height:'150px',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <h4 style={{
                    marginRight:'13%',
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
                <Link to='/about-luminouss' id='link-to-about'>루미너스 팀 더 알아보기</Link> {/* component로 */}
            </div>
            <Footer />
        </>
    )
};

export default SecondIntroduction;