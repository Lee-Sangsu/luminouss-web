import React from 'react';
import firebase from "global/fbase";

export const RegisterStatus = () => {
    const [registration, setRegistration] = React.useState([]);

    const getWalkRoadInfo = async () => {
        try{
            const resRef = await firebase.firestore().collection('InputRegister');
            (
                await resRef.get()).forEach((doc) => {
                const arrObj = {
                    // date name phoneNum place roadName
                    ...doc.data()
                };
                setRegistration((prev) => [arrObj, ...prev]);
            })
        } catch(e){console.log(e);}

    };

    React.useEffect(() => {
        getWalkRoadInfo();
    }, [])

    const h5style = {
        margin: '20px',
    };
    const divStyle = {
        display: "flex",
        width: 'max-content',
        justifyContent: 'flex-start'
    };

    
    return (
        <div>
            <div style={divStyle}>
                <h5 style={{...h5style, width:'75px'}}>신청일</h5>
                <h5 style={{...h5style, width: '310px'}}>이름</h5>
                <h5 style={{...h5style, width: '115px'}}>거주 지역</h5>
                <h5 style={{...h5style, width: '226px'}}>산책로</h5>
                <h5 style={h5style}>전화번호</h5>
            </div>
            <hr />
            {registration ? registration.map((data, index) => <div key={index} style={divStyle}>
                <h5 style={{...h5style, width:'75px'}}>{data.date}</h5>
                <h5 style={{...h5style, width: '310px'}}>{data.name}</h5>
                <h5 style={{...h5style, width: '115px'}}>{data.place}</h5>
                <h5 style={{...h5style, width: '226px'}}>{data.roadName}</h5>
                <h5 style={h5style}>{data.phoneNum}</h5>
            </div>
            ): <div style={{display:'block', backgroundColor:'#efefef', height:window.innerHeight, width:window.innerWidth}}>
                산책로 정보 불러오는 중..
            </div>}
        </div>
    )
};