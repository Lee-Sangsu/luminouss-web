import React, { useState } from "react";
import firebase from "global/fbase";
import { useHistory, Link } from "react-router-dom";
import Kakao from 'kakaojs';
import {useSetRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';
import IsLoggedInState from 'recoilStates/IsLoggedInState';
import 'components/styles/SignIn.css';
import 'components/styles/Footer.css';

import Footer from "components/molecules/ForHome/Footer";
import GlobalNav from "global/GlobalNav";
import Subject from "components/molecules/Subject";
import disappearPlaceholder from 'functions/DisappearPlaceHolder';

const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const setInit = useSetRecoilState(InitializeState);
    const setLoggedIn = useSetRecoilState(IsLoggedInState);
    

    const onChange = (event) => { 
        const {
            target: {
                name, value
            }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            // let data;
            await firebase.auth().signInWithEmailAndPassword(email, password);
            //어케 홈 화면으로 다시 돌려보내지
            setLoggedIn(true);
            setInit(true);
            history.push("/");
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };
    const loginWithKaKao = () => {
        Kakao.Auth.login({
            scope: 'profile',
            success: (res) => {
                Kakao.Auth.setAccessToken(res.access_token);
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: function(res) {
                     console.log(JSON.stringify(res))
                     setInit(true);
                     setLoggedIn(true);
                     history.push("/");
                    },
                    fail: function(error) {
                        alert(
                            'login success, but failed to request user information: ' +
                            JSON.stringify(error)
                        )
                    },
                })
            }, 
            fail: (err) => {
                console.error(err);
            }
        });
    }; // 동의 항목 추가하고 코드 짜면 끝
    



    return (<>
    <GlobalNav isNotHome={true} />
    <div id="login-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'column',
        height: `${window.innerHeight}px`,
        backgroundColor:'#efefef'
    }}>
        <Subject id="sign-in-h2" circleColor="rgba(41, 117, 61, 1)" circleId="login-circle" text="로그인하고 새로운 산책로를 추가해보세요" />

        <form id="sign-in-form" onSubmit={onSubmit} >
            <div id='input-texts'>
                <input id="email-input" onFocus={disappearPlaceholder} name="email" type="email" value={email} onChange={onChange} placeholder="Email address" required></input>
            </div>
            <div id='input-texts'>
                <input id="pw-input" onFocus={disappearPlaceholder} name="password"  type="password" value={password} onChange={onChange} placeholder="Password" required></input>
            </div>
            <input id="sign-in-submit" type="submit" value="Log In" ></input>
            {error}
        </form>
        <button id="kakao-login" onClick={loginWithKaKao}>카카오 로그인</button>
        <h3>아직 계정이 없으신가요?</h3> <Link to="/sign-up" id="create-acc">회원가입하기</Link>
    </div>
    <Footer />
    </>
    );
};

export default SignIn;