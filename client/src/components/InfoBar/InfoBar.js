import React from 'react'

import './InfoBar.css';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';


const InfoBar = ({room}) => {

    return(
    <div className='infoBar'>
       <div classname='leftInnerContainer'>
            <img className='onlineIcon' src={onlineIcon} alt='online image' />
            <h1 className='room'> {room} </h1>

       </div>
       <div classname='rightInnerContainer'>
        <a href='/'>    <img className='close' src={closeIcon} alt='close  image' />    </a>
       </div>
        
    </div>

    )


}






export default InfoBar;
