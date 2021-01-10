import React from 'react';
import GlobalNav from 'global/GlobalNav';
import Subject from 'components/molecules/Subject';
import Footer from 'components/molecules/ForHome/Footer';

const AboutTeam = () => {
    return (
        <>
        <GlobalNav sFirstPage={false} isNotHome={true} />
        <div id="team-container">
                <div className="team-team">
                <Subject id='team-page' circleColor='rgba(255, 193, 7, 1)' text="Team" />
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
                <Footer />
            </div>
        </>
    )
};

export default AboutTeam;
