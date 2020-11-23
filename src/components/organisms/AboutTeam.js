import React from 'react';
import 'components/styles/About-main.css';


const AboutTeam = () => {
    return (
        <>
            <div id="container">
                <div className="team">
                    <img src="images/titles/team.png"></img>
                </div>
                <div className="faces-wrap">
                    <div className="face">
                        <img src="images/team-faces/낑깡.jpg" />
                        <div className="name-role">
                            <h4>이소현</h4>
                            <h5>운영/기획</h5>
                        </div>

                    </div>
                    <div className="face">
                        <img src="images/team-faces/늘보.jpg" />
                        <div className="name-role">
                            <h4>김서현</h4>
                            <h5>개발</h5>
                        </div>

                    </div>
                    <div className="face">
                        <img src="images/team-faces/콜라.jpg" />
                        <div className="name-role">
                            <h4>이상수</h4>
                            <h5>개발</h5>
                        </div>

                    </div>
                    <div className="face">
                        <img src="images/team-faces/자몽.jpg" />
                        <div className="name-role">
                            <h4>차수현</h4>
                            <h5>마케팅</h5>
                        </div>

                    </div>
                    <div className="face">
                        <img src="images/team-faces/공주.jpg" />
                        <div className="name-role">
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
