import React from 'react'
import './CSS/MainLeft.css'

type MainleftProps = {
    message: string;
  };

const Mainleftpage = ({ message }: MainleftProps) =>

(<div className="mainpage_leftside">{message='Hello'} World</div>)

export default Mainleftpage


