import React from 'react'
import './CSS/MainRight.css'

type MainRightProps = {
    message: string;
  };

const Mainrightpage = ({ message }: MainRightProps) =>
 <div className="mainpage_rightside">{message='FinalProject'} TMT</div>;

export default Mainrightpage