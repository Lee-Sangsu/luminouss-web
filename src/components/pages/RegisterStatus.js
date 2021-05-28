import React from 'react';
import firebase from "global/fbase";
import { Registrations } from 'components/molecules/Registrations';

export const RegisterStatus = () => {
    const [registration, setRegistration] = React.useState([]);
    const [loadFin, setLoadFin] = React.useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);  
    const [query, setQuery] = React.useState('');
    const [lastVisible, setLastVisible] = React.useState({});
    const [firstVisible, setFirstVisible] = React.useState({});

    const getOtherPage = async (destination) => {
        try {
            setLoadFin(false);
            setRegistration([]);
            if (destination === "next") {
                const resRef = await firebase.firestore().collection('InputRegister').orderBy('date', 'desc').startAfter(lastVisible).limit(30);
                const data = await resRef.get();
                data.forEach((doc) => {
                    setRegistration((prev) => [...prev, doc.data()]);
                })
                setFirstVisible(data.docs[0]);
                setLastVisible(data.docs[data.docs.length-1]);
                setCurrentPage(currentPage+1);
            } else if (destination === "prev") {
                if (currentPage === 1) {
                    return ;
                } else {
                    const resRef = await firebase.firestore().collection('InputRegister').orderBy('date', 'desc').endBefore(firstVisible).limit(30);
                    const data = await resRef.get();
                    data.forEach((doc) => {
                        setRegistration((prev) => [...prev, doc.data()]);
                    })
                    setFirstVisible(data.docs[0]);
                    setLastVisible(data.docs[data.docs.length-1]);
                    setCurrentPage(currentPage-1);
                }
            }
            setLoadFin(true);
            window.scrollTo(0,0);
        } catch(e){console.log(e);}
    }

    const pagination = ({target}) => {
        if (currentPage === 1 && target.name === "prev-btn"){
            return;
        } else if (target.name === "next-btn") {
            getOtherPage('next');
        } else {
            getOtherPage('prev');

        }
    };

    const getWalkRoadInfo = async () => {
        try {
            setLoadFin(false);
            setRegistration([]);
            const resRef = await firebase.firestore().collection('InputRegister').orderBy('date', 'desc').limit(30);
            const data = await resRef.get();
            data.forEach((doc) => {
                setRegistration((prev) => [...prev, doc.data()]);
            })
            setLastVisible(data.docs[data.docs.length-1]);
            setLoadFin(true)
        } catch(e){console.log(e);}
    };
    
    // eslint-disable-next-line
    React.useEffect(() => {
        getWalkRoadInfo();
    }, [])

    async function onSearch() {
        try {
            setLoadFin(false);
            setRegistration([]);
            const resRef = await firebase.firestore().collection('InputRegister').where('name', '==', query);
            (await resRef.get()).forEach((doc) => {
                const arrObj = {
                    // date name phoneNum place roadName
                    ...doc.data()
                };
            setRegistration((prev) => [arrObj, ...prev]);
            })
            setCurrentPage(1);    
            setLoadFin(true);
        } catch (e){console.log(e);}
    };

    const getH5Style = (width) => {
        return {
            margin: '20px',
            width: width
        }
    };
    const divStyle = {
        display: "flex",
        width: 'max-content',
        justifyContent: 'flex-start'
    };
    const divCenterStyle = {
        display:'flex', 
        height:window.innerHeight, width:window.innerWidth, alignItems:'center', justifyContent: 'center'
    };

    
    return (
        <div>
            <div style={{...divStyle, position:'fixed', backgroundColor:'gainsboro', marginTop:'-62px', width:'100%'}}>
                <h5 style={{...getH5Style('90px'), textAlign: 'center'}}>답사 마무리 날짜</h5>
                <h5 style={getH5Style('310px')}>이름</h5>
                <h5 style={getH5Style('115px')}>거주 지역</h5>
                <h5 style={getH5Style('226px')}>산책로</h5>
                <h5 style={getH5Style('100px')}>전화번호</h5>
                <div style={getH5Style()}>
                    <input name="search" value={query} onChange={({target}) => setQuery(target.value)} placeholder="이름으로 검색" />
                    <button onClick={onSearch}>Search</button>
                    <button onClick={() => window.location.reload()}>전체 결과 보기</button>
                </div>
            </div>
            <div style={{marginBlockStart:'62px'}} />
            {loadFin ? registration.map((data, index) => <>
                <Registrations key={index} data={data} index={index} divStyle={divStyle} getH5Style={getH5Style} />
            </>
            ): <div style={divCenterStyle}>
                 정보 불러오는 중..
            </div>}
            <div style={{...divCenterStyle, height: '50px', justifyContent:'space-evenly', backgroundColor:'gainsboro'}}>
                <button name="prev-btn" onClick={pagination}>{`<`}</button>
                <button name="next-btn" onClick={pagination}>{`>`}</button>
            </div>
        </div>
    )
};
