import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/core";

const Home = ({ isLoggedIn }) => {
    return (
        <>
            <h1>시각장애인의 눈과 발이 되어주세요.</h1>
            <h3>문제 설명 .....</h3>

                <Box bg="black" w="100px" h="100px" maxW="sm" borderWidth="1px" rounded="lg" p={4} className="add-road-info" >
                    <Link to="/add-road-info" >산책로 추가하기</Link>
                </Box>
        </>
    );
};

export default Home;