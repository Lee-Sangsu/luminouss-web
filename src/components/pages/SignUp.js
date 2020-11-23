import React, { useState } from "react";
import firebase from "global/fbase";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
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
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            //어케 홈 화면으로 다시 돌려보내지
            history.push("/");
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };


    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'column'
    }}>
        <h2>계정을 만들고 새로운 산책로를 추가해보세요</h2>
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
            <input type="submit" value="회원가입" style={{
                marginTop: '20px',
                width: '200px',
                height: '30px'
            }}></input>
            {error}
        </form>
        <h3>이미 계정이 있으신가요?</h3> <Link to="/sign-in">로그인하기</Link>
    </div>
    );
};

export default Register;