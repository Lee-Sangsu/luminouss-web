import React, { useState } from "react";
import firebase from "global/fbase";
import { useHistory, Link } from "react-router-dom";

const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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


    return (
    <>
        <span>로그인 PAGE</span>
        <h2>계정을 만들고 산책로를 추가해보세요</h2>
        <form onSubmit={onSubmit}>
            <h4>이메일</h4>
            <input name="email" type="email" value={email} onChange={onChange} required></input>
            <h4>비밀번호</h4>
            <input name="password" type="password" value={password} onChange={onChange} required></input>
            <input type="submit" value="로그인"></input>
            {error}
        </form>
        <h3>아직 계정이 없으신가요?</h3> <Link to="/sign-up">회원가입하기</Link>
    </>
    );
};

export default SignIn;