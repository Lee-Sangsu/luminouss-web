import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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


    return (
    <>
        <span>로그인</span>
        <h2>계정을 만들고 산책로를 추가해보세요</h2>
        <form>
            <h4>이메일</h4>
            <input name="email" type="email" value="email" onChange={onChange} required></input>
            <h4>비밀번호</h4>
            <input name="password" type="password" value="password" onChange={onChange} required></input>
        </form>
    </>
    );
};

export default Auth;