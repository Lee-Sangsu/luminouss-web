import React from 'react';
import 'components/styles/About-Team.css';
import { Link } from 'react-router-dom';
import 'components/styles/AboutNav.css';
import OnSolutionClick from 'functions/NavigationFunctions/OnSolutionClick';
import OnTeamClick from 'functions/NavigationFunctions/OnTeamClick';
import OnVisionClick from 'functions/NavigationFunctions/OnVisionClick';

const AboutTeam = () => {
    return (
        <>
        <nav>
        <ul className="about-ul">
            <li className='list'>
                <Link to='/about-luminouss' id="vision" onClick={OnVisionClick}> Vision&Mission </Link>
            </li>
            <li className='list'>
                <Link to='/about-luminouss-team' id="team" onClick={OnTeamClick}> Team </Link>
            </li>
            <li className='list'>
                <Link to='/about-luminouss-solution' id="solution" onClick={OnSolutionClick}> Solution </Link>
            </li>
        </ul>
        </nav>
        <div id="team-container">
                <div className="team-team">
                    <img src={require("images/titles/team.png").default} alt="루미너스"></img>
                </div>
                <div className="team-faces-wrap">
                    <div className="team-face">
                        <img src={require("images/team-faces/낑깡.jpg").default} alt="기획자 이소현" />
                        <div className="team-name-role">
                            <h4>이소현</h4>
                            <h5>운영/기획</h5>
                        </div>

                    </div>
                    <div className="team-face">
                        <img src={require("images/team-faces/늘보.jpg").default} alt="개발자 김서현" />
                        <div className="team-name-role">
                            <h4>김서현</h4>
                            <h5>개발</h5>
                        </div>

                    </div>
                    <div className="team-face">
                        <img src={require("images/team-faces/콜라.jpg").default} alt="개발자 이상수" />
                        <div className="team-name-role">
                            <h4>이상수</h4>
                            <h5>개발</h5>
                        </div>

                    </div>
                    <div className="team-face">
                        <img src={require("images/team-faces/자몽.jpg").default} alt="마케터 차수현" />
                        <div className="team-name-role">
                            <h4>차수현</h4>
                            <h5>마케팅</h5>
                        </div>

                    </div>
                    <div className="team-face">
                        <img src={require("images/team-faces/공주.jpg").default} alt="디자이너 유비손" />
                        <div className="team-name-role">
                            <h4>유비손</h4>
                            <h5>디자인</h5>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

export default AboutTeam;
