import React from 'react';
import 'components/styles/About/About-Solution.css';
import { Link } from 'react-router-dom';
import 'components/styles/About/AboutNav.css';


const AboutSolution = () => {
    return (
        <>
        <nav>
        <ul className="about-ul">
            <li className='list'>
                <Link to='/about-luminouss' id="vision" style={{
                    color:'black'
                }}> Vision&Mission </Link>
            </li>
            <li className='list'>
                <Link to='/about-luminouss-team' id="team" style={{
                    color:"black"
                }}> Team </Link>
            </li>
            <li className='list'>
                <Link  ink to='/about-luminouss-solution' id="solution" style={{
                    color:"green"
                }}> Solution </Link>
            </li>
        </ul>
        </nav>
            <div id="comm-container">
                <img className="comm-cardnews-tit" src={require("images/titles/cardnews.png").default} alt="카드뉴스" />
                <pre>
    {`비장애인들이 시각장애인들의 특성을 잘 모르고, 이해하지 못해 벌어지는 '시각장애
    인들에 대한 인식 부족 문제'를 해결하기 위한 컨텐츠를 제작합니다. 시각장애인들
    의 입장에서 들려주는 여러 인식 부족과 관련된 문제들을 만나보세요.`}
                </pre>
                <div className="comm-instar-contetnts-wrap">
                    <div className="comm-instar-contents">
                        <a className="comm-first-content" href="https://www.instagram.com/p/CBKiU_kpghR/">

                            <h2>국회에 처음 들어간 강아지 조이</h2>
                        </a>
                    </div>
                    <div className="comm-instar-contents">
                        <a className="comm-second-content" href="https://www.instagram.com/p/B-vkfKInbk_/">
                            <h2>{`세상에 만지면 안되는
                            강아지가 있다고요?`}</h2>
                        </a>
                    </div>
                    <div className="comm-instar-contents">
                        <a className="third-content" href="https://www.instagram.com/p/B-vjodBnCck/">
                            <h2>루미너스가 뭐야?</h2>
                        </a>
                    </div>
                    <div className="comm-instar-contents">
                        <a className="comm-fourth-content" href="https://www.instagram.com/p/CEbIZ71p6I4/">
                            <h2>당신은 눈을 가리고 산책할 수 있나요?</h2>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AboutSolution;
