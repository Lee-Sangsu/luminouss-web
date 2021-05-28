const getWalkRoadInfo = async () => {
    try {
        setLoadFin(false);
        const resRef = await firebase.firestore().collection('InputRegister').orderBy('date', 'asc').limit(20);
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