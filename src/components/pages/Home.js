import React from "react";
import { Link } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
    return (
        <>
            <h1>시각장애인의 눈과 발이 되어주세요.</h1>
            <h3>문제 설명 .....</h3>


                    <Link to="/add-road-info" >산책로 추가하기</Link>
        </>
    );
};

export default Home;