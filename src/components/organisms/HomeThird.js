import React from 'react';
import Footer from 'components/molecules/ForHome/Footer';
import firebase from 'global/fbase';

const HomeThird = () => {

    const downloadPdf = async () => {
        try {
            const storage = firebase.storage();
            const storageRef = storage.refFromURL('gs://luminouss-web.appspot.com/워크위드 브랜드 소개서.pdf');
            const url = await storageRef.getDownloadURL();
            
            const a = document.createElement('a');
            a.href= url;
            a.setAttribute('download', true); 
            a.click();
        } catch(e){console.log(e);}
    };

    const openPdf = () => {
        const url = 'https://drive.google.com/file/d/1yTQzj9-4X5hYqFmlsLVWdlPGUZUssVrd/view?usp=sharing';
        const a = document.createElement('a');
        a.href= url;
        a.setAttribute('download', true); 
        a.click();
    };

    return (
        <div id="third-page" style={ window.innerWidth > 500 ? {
            top: `${window.innerHeight}px`
        }
        : {
            top:`${window.innerHeight * 2}px`,
            position:'absolute',
        }}>
            <div id="introduction-container" style={window.innerWidth < 500?{width:window.innerWidth}:{}}>
                <h1 id="down-our-intro">Download Our Introduction</h1>
                <div id="btns">
                    <button onClick={openPdf} id="brand-book">
                        브랜드북
                        {/* <h1 id="btn-text">브랜드북</h1> */}
                    </button>
                    <button onClick={downloadPdf} id="see-now">
                        바로보기
                        {/* <h1 id="btn-text">바로보기</h1> */}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default HomeThird;