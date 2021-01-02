import React from'react';

const GlobalNav = ({isFirstPage}) => {
    
    const onClick = () =>  {
        document.getElementById("nav-menu").style.display = 'none';
        document.getElementById("our-logo").style.width = '68%';
        document.getElementById("menu-container").style.width = '20%';
    };

    const onCloseClick = () => {
        document.getElementById("nav-menu").style.display = 'block';
        document.getElementById("menu-container").style.width = '0';
        document.getElementById("our-logo").style.width = '78%';
    };

    return (
        <div id="header-nav">
            {isFirstPage ? <h3 id="our-logo" style={{display:'flex', width:'78%', justifyContent:'center', zIndex:'5'}}>WalkWith</h3> : <></>}
            <h6 id="nav-menu" onClick={onClick} >MENU</h6>
            <div id="menu-container">
                <button id="close-container" onClick={onCloseClick}>X</button>
                <h3 id="menu-h3">회원가입/로그인</h3>
                <h3 id="menu-h3">산책로 정보</h3>
                <h3 id="menu-h3">About Us</h3>
                <h3 id="menu-h3">TEAM</h3>
                <h5 id="menu-h5">Instargram</h5>
                <h5 id="menu-h5">Facebook</h5>
            </div>
        </div>
    )
};

export default GlobalNav;