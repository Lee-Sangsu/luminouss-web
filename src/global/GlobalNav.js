import React from'react';
import 'components/styles/GlobalNavigation.css';
import {useRecoilValue} from 'recoil';
import IsLoggedInState from 'recoilStates/IsLoggedInState';


const GlobalNav = ({isFirstPage, isNotHome}) => {

    const isLoggedIn = useRecoilValue(IsLoggedInState);

    
    const onClick = () =>  {
        document.getElementById("nav-menu").style.display = 'none';
        document.getElementById("header-nav").style.zIndex = '10';
        document.getElementById("menu-container").style.width = '100%';
        const menuItems = document.getElementsByClassName("menu-items");
        setTimeout(() =>{
            [].forEach.call(menuItems, function (el) {
                el.style.display = 'block';
            });
        }, 180) 
    };

    const onCloseClick = () => {
        document.getElementById("menu-container").style.width = '0%';
        const menuItems = document.getElementsByClassName("menu-items");
        setTimeout(() =>{
            [].forEach.call(menuItems, function (el) {
                el.style.display = 'none';
            });
        }, 200) 
        setTimeout(() => {
            document.getElementById("header-nav").style.zIndex = '6';
            document.getElementById("nav-menu").style.display = 'block';
        }, 665)
    };

    return (
        <div id="header-nav">
            {isFirstPage && isNotHome === false ? <h3 id="our-logo" style={{display:'flex', width:window.innerWidth, justifyContent:'center', position:'absolute', zIndex:'-1', transition:'0.5s ease-in'}}>WalkWith</h3> : <></>}
            {isNotHome ? <h3 id="our-logo" style={{display:'flex', width:window.innerWidth*0.9, justifyContent:'flex-start', position:'absolute', transition:'0.5s ease-in'}}>WalkWith</h3> : <></>}
            <h6 id="nav-menu" onClick={onClick} >MENU</h6>
            <div id="menu-container">
                <h2 id="close-container" onClick={onCloseClick}>X</h2>
                {isLoggedIn ? 
                <a href="/my-profile" id="menu-a" className="menu-items">내 프로필</a>
                :
                <a href="/sign-in" id="menu-a" className="menu-items">회원가입/로그인</a>
                }
                <a href="/watch-roads" id="menu-a" className="menu-items">산책로 정보</a>
                <a href="/about-luminouss" id="menu-a" className="menu-items">About Us</a>
                <a href="/about-luminouss-team" id="menu-a" className="menu-items">TEAM</a>
                <a href="https://www.instagram.com/luminouss.official/" id="menu-insta" className="menu-items">Instargram</a>
                <a href="https://www.facebook.com/Luminouss-100148985264742" id="menu-facebook" className="menu-items">Facebook</a>
            </div>
        </div>
    )
};

export default GlobalNav;