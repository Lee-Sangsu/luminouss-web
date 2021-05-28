import React from 'react';
import firebase from "global/fbase";

export const RegisterStatus = () => {
    const [registration, setRegistration] = React.useState([]);
    const [loadFin, setLoadFin] = React.useState(false);
    
    
    /*
    var first = db.collection("InputRegister").limit(25);
    
    return first.get().then((documentSnapshots) => {
    // Get the last visible document
    var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    console.log("last", lastVisible);

    // Construct a new query starting at this document,
    // get the next 25 cities.
    var next = db.collection("InputRegister").startAfter(lastVisible).limit(25);
    });

    */

    const getWalkRoadInfo = async () => {
        try {
            setLoadFin(false);
            const resRef = await firebase.firestore().collection('InputRegister');
            (await resRef.get()).forEach((doc) => {
                const arrObj = {
                    // date name phoneNum place roadName
                    ...doc.data()
                };
                setRegistration((prev) => [arrObj, ...prev]);
                setLoadFin(true)
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
                <h5 style={{...h5style, width:'75px'}}>답사 마무리</h5>
                <h5 style={{...h5style, width: '310px'}}>이름</h5>
                <h5 style={{...h5style, width: '115px'}}>거주 지역</h5>
                <h5 style={{...h5style, width: '226px'}}>산책로</h5>
                <h5 style={h5style}>전화번호</h5>
            </div>
            <hr />
            {loadFin ? registration.map((data, index) => <div key={index} style={divStyle}>
                <h5 style={{...h5style, width:'75px'}}>{data.date}</h5>
                <h5 style={{...h5style, width: '310px'}}>{data.name}</h5>
                <h5 style={{...h5style, width: '115px'}}>{data.place}</h5>
                <h5 style={{...h5style, width: '226px'}}>{data.roadName}</h5>
                <h5 style={h5style}>{data.phoneNum}</h5>
            </div>
            ): <div style={{display:'block', backgroundColor:'#efefef', height:window.innerHeight, width:window.innerWidth}}>
                 정보 불러오는 중..
            </div>}
        </div>
    )
};