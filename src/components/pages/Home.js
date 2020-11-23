import React from "react";
import { Link, useHistory } from "react-router-dom";
import "components/styles/Home.css"
// import firebase from "global/fbase";
// import FirestoreData from 'components/molecules/FirestoreData';


const Home  = ({ isLoggedIn }) => {
    const history = useHistory();
    //login 안 된 경우, 로그인 필요합니다 알러트 띄우기
    const onClick = (event) => {
        event.preventDefault();
        if (isLoggedIn){
            history.push('/add-road-info');
        } else {
            window.alert("Login required");
            history.push('sign-in');
            // return (<Route path="/sign-in" component={SignIn} />);
        }
    };
    // const [arr, setArr]= useState([]);
     
    // 화면 켜질때 딱 한번만 array에 담는걸 어떻게 할까.. 
    // useEffect((  ) => {
    //     const a = [];
    //     firebase.firestore().collection('WalkRoad')
    //     .get()
    //     .then((res) => {
    //         res.forEach((doc) => {
    //             a.push(doc.data().roadName);
    //         });
    //         setArr(a);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }, [])
 
    return (
        <>
            <div className="mainContainer">
                <h1 className="mainTitle">
                    시각장애인의 눈과 발이 되어주세요.
                </h1>
                <h3 className="explanation">
                    문제 설명...
                </h3>

                <div className="linkBox">
                    <div className="addWalkway_text">산책로 정보 추가하기</div>
                    <a href="/add-road-info" className="addWalkway" onClick={onClick}>
                        +
                    </a>
                </div>
                {/* {arr.map((roadName, index) => <FirestoreData key={index} item={roadName} />)} */}
                {/* {console.log(newArr)} */}
                {/* {console.log(arr)} */}
            </div>
        </>
    );
};

export default Home;