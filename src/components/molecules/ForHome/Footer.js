import React from 'react';
import AddRoadLink from 'components/atoms/AddRoadLink';
import 'components/styles/Footer.css';

const Footer = () => {
    return (
        <>

            <div id="footer-white" >
                <div id="footer-left">
                    <pre id="footer-left-pre" >
{`Let's make a better
walking experience!`}
                    </pre>
                    <AddRoadLink />
                    <div id="address-container">
                        <div id="address-things">
                            <h6 id="address-thing">주소</h6>
                            <h6 id="address-thing">대표</h6>
                            <h6 id="address-thing">전화</h6>
                            <h6 id="address-thing">이메일</h6>
                        </div>
                        <div id="address-infos">
                            <h6 id="address-info">서울특별시 종로구 대학로 116</h6>
                            <h6 id="address-info">이소현</h6>
                            <h6 id="address-info">010-5874-5988</h6>
                            <h6 id="address-info">sohyeon10051@gmail.com</h6>
                        </div>
                    </div>
                </div>
                <h4 id="copy-rights">CopyrightⒸ Luminouss. All Rights Reserved.</h4>
            </div>

        </>
    )
};

export default Footer;