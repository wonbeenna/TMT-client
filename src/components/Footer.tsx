import React from "react";
import "./CSS/Footer.css"
const Footer = () => {
  const handleGit = (Name: string): void => {
    window.open(`https://github.com/${Name}`);
  };

  return (
    <div className="footerContainer">
      <img src="/img/GitLogo.png" alt=""></img>
      <span onClick={() => handleGit("baymaxxxxx")}>지은</span>
      <span onClick={() => handleGit("wonbeenna")}>원빈</span>
      <span onClick={() => handleGit("Lee-SangRyeol")}>상렬</span>
      <span onClick={() => handleGit("yoolee741")}>유림</span>
    </div>
  );
};

export default Footer;
