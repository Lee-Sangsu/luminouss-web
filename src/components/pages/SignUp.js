import React, { useState } from "react";
import firebase from "global/fbase";
import { useHistory, Link } from "react-router-dom";
import {useSetRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';
import disappearPlaceholder from 'functions/DisappearPlaceHolder';
import Footer from "components/molecules/ForHome/Footer";
import GlobalNav from "global/GlobalNav";
import Subject from "components/molecules/Subject";
import swal from "sweetalert";


const Register = () => {
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
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            setInit(true);
            
            history.push("/");
        } catch (error) {
            swal(error.message);
        }
    };


    return (<>
    <GlobalNav isNotHome={true} />
    <div style={{
        display: 'flex',
        justifyContent: window.innerWidth > 500 ? 'center':'flex-start',
        alignItems:'center',
        flexDirection: 'column',
        height: `${window.innerHeight}px`,
        backgroundColor:'#efefef'
    }}>
        {window.innerWidth > 500 ?<Subject id="sign-in-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text="계정을 만들고 새로운 산책로를 추가해보세요" />: <Subject id="sign-in-h2" circleColor="rgba(41, 117, 61, 1)" circleId="login-circle" text="회원가입" /> }
        <form onSubmit={onSubmit} id="sign-in-form">
            <div id='input-texts'>
                <input id="email-input" placeholder="Email address" name="email" onFocus={disappearPlaceholder} type="email" value={email} onChange={onChange} required></input>
            </div>
            <div id='input-texts'>
                <input id="pw-input" placeholder="Password" name="password" onFocus={disappearPlaceholder} type="password" value={password} onChange={onChange} required></input>
            </div>
            <input type="submit" value="회원가입" id="sign-in-submit"></input>
        </form>
        <h3 id="have-acc-q">이미 계정이 있으신가요?</h3> <Link to="/sign-in" id="create-acc">로그인하기</Link>
    </div>
    <Footer />
    </>);
};

export default Register;