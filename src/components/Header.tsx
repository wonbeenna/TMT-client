import React from 'react';
import './CSS/Header.css'

const Header = () => {
    return (
        <div className="headerContainer">
            <div className="headerLogo"><img src="../img/Logo006.png" alt="" /></div>
            <div className="headerRightside">
                <p>로그인</p>
                <p>회원가입</p>
            </div>
        </div>
    )
}

export default Header;
