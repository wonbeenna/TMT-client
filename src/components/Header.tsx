import React from 'react';
import styled from 'styled-components';
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

// const HeaderContainer = styled.div`
// display: flex;
//     flex-direction: column;
//     position: fixed;
//     top: 0px;
//     width: 100%;
//     height: 30px
// `
export default Header;
