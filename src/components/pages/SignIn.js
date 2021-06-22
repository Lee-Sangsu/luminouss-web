import React, { useState } from "react";
import firebase from "global/fbase";
import { useHistory, Link } from "react-router-dom";
// import Kakao from 'kakaojs';
import {useSetRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';

import Footer from "components/molecules/ForHome/Footer";
import GlobalNav from "global/GlobalNav";
import Subject from "components/molecules/Subject";
import disappearPlaceholder from 'functions/DisappearPlaceHolder';
import swal from "sweetalert";

const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setInit = useSetRecoilState(InitializeState);

    

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
            window.localStorage.setItem('user', 'EmailUser')
            setInit(true);
            history.push("/");
        } catch (error) {
            swal(error.message);
        }
    };
    const loginWithKaKao = () => {
        window.Kakao.Auth.login({
            scope: 'profile',
            success: (res) => {
                window.Kakao.Auth.setAccessToken(res.access_token);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: function(res) {
                    //  console.log(JSON.stringify(res))
                     setInit(true);

                     window.localStorage.setItem('user', JSON.stringify({
                         id: res.id,
                         nickname: res.properties.nickname
                     }));
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
        justifyContent: window.innerWidth > 500 ? 'center':'flex-start',
        alignItems:'center',
        flexDirection: 'column',
        height: `${window.innerHeight}px`,
        backgroundColor:'#efefef'
    }}>
        {window.innerWidth > 500 ? <Subject id="sign-in-h2" circleColor="rgba(41, 117, 61, 1)" circleId="login-circle" text="로그인하고 새로운 산책로를 추가해보세요" /> : <Subject id="sign-in-h2" circleColor="rgba(41, 117, 61, 1)" circleId="login-circle" text="로그인" /> }

        <form id="sign-in-form" onSubmit={onSubmit} >
            <div id='input-texts'>
                <input id="email-input" onFocus={disappearPlaceholder} name="email" type="email" value={email} onChange={onChange} placeholder="Email address" required></input>
            </div>
            <div id='input-texts'>
                <input id="pw-input" onFocus={disappearPlaceholder} name="password"  type="password" value={password} onChange={onChange} placeholder="Password" required></input>
            </div>
            <input id="sign-in-submit" type="submit" value="Log In" ></input>
            {/* {error} */}
        </form>
        <button id="kakao-login" onClick={loginWithKaKao}>카카오 로그인</button>
        <h3>아직 계정이 없으신가요?</h3> <Link to="/sign-up" id="create-acc">회원가입하기</Link>
    </div>
    <Footer />
    </>
    );
};

export default SignIn;