import React, { useState } from "react";
import firebase from "global/fbase";
import { useHistory, Link } from "react-router-dom";
import Kakao from 'kakaojs';
import {useSetRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';
import useRecoilState from 'recoilStates/IsLoggedInState';

const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const setInit = useSetRecoilState(InitializeState);
    const setLoggedIn = useSetRecoilState(useRecoilState);

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
    



    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'column'
    }}>
        <h2>로그인하고 새로운 산책로를 추가해보세요</h2>
        <form onSubmit={onSubmit} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            flexDirection: 'column'
        }}>
            <h4>이메일</h4>
            <input name="email" type="email" value={email} onChange={onChange} required></input>
            <h4>비밀번호</h4>
            <input name="password" type="password" value={password} onChange={onChange} required></input>
            <input type="submit" value="로그인" style={{
                marginTop: '20px',
                width: '200px',
                height: '30px'
            }}></input>
            {error}
        </form>
        <button onClick={loginWithKaKao}> kakao check</button>
        <h3>아직 계정이 없으신가요?</h3> <Link to="/sign-up">회원가입하기</Link>
    </div>
    );
};

export default SignIn;