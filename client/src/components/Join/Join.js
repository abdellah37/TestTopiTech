import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
   
    // la j'ai crée 2 usestates pour stocker name et room qui vont étre donner par l'utilisateur 
    //et j'ai passée ces parametres au componenet   Chat a travers le lien 
    return(
    <div className="joinOuterContainer">
        <div className="joinInnerContainer">
               <h1 className="heading"> join </h1>
               <div><input placeholder="name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
               <div><input placeholder="room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}/></div>
               <Link onClick={event => (!name ||!room) ? event.preventDefault(): null} to={`chat?name=${name}&room=${room}`} > 
        <button className="button mt-20" type="submit" >Sign in </button>
        </Link>

        </div>
       

    </div>
    )
}

export default Join;

