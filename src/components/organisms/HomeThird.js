import React from 'react';
import 'components/styles/Footer.css';
import Footer from 'components/molecules/ForHome/Footer';
const HomeThird = () => {
    return (
        <div id="third-page" style={{
            top:`${window.innerHeight}px`,
        }} >
            <div id="introduction" style={{
                height:'55vh',
                width:'100%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                background: `#C3C3C3`
            }}>
                <h1 id="down-our-intro">Download Our Introduction</h1>
                <div id="btns">
                    <button id="brand-book">
                        브랜드북
                        {/* <h1 id="btn-text">브랜드북</h1> */}
                    </button>
                    <button id="see-now">
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