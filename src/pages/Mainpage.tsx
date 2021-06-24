import React from 'react';
import Mainrightpage from '../components/MainRight';
import Mainleftpage from '../components/MainLeft';
import './CSS/Mainpage.css'
// function Mainpage() {
//   return (
//    <div className='MainContainer'>
//      <Greetings name="Hello" onClick={onClick} />;
//     <Mainleftpage message="Hello"/>
//     <Mainrightpage message="i"/>
//         </div>
//   );
// }

const Mainpage = ()  => {
    
    return (

        <div className='mainpage_container'>
        <Mainleftpage message="TMT"/>
        <Mainrightpage message="i"/>
        </div>
    )
};
  
export default Mainpage;