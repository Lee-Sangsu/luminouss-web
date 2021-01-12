import React from 'react';
import firebase from 'global/fbase';
import GlobalNav from 'global/GlobalNav';

const DownloadGuideBook = () => {

    const goToDownload = async () => {
        try {
            const storage = firebase.storage();
            const storageRef = storage.refFromURL('gs://luminouss-web.appspot.com/산책로 답사 가이드북.pdf');
            const url = await storageRef.getDownloadURL();
            
            const a = document.createElement('a');
            a.href= url;
            a.setAttribute('download', true); 
            a.click();
        } catch(e){console.log(e);}
    };
    React.useEffect(() => {
        goToDownload();
    }, [])

    return(
        <div style={{display:'flex', width:'100%', height:window.innerHeight, justifyContent:'center', alignItems:'flex-start'}}>
            <GlobalNav isFirstPage={false} isNotHome={true} />
            {/* <button style={marginTop} onClick={goToDownload}>가이드 다운로드 받기</button>  */}
        </div>
    )
};

export default DownloadGuideBook;