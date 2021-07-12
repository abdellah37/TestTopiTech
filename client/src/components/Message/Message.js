import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({message : {user,text} , name}) => {
     let isSentByCurrentUser = false;
     const trimmedName = name.trim().toLowerCase();
//dans cette partie lorsque un message est envoyé par la partie backend avant de l'afficher on doit 
//verifier est que ce message est enviyer par l'utilisateur actuel ou par un autre utilisateu distant
//puisque pour chacun y a un affichage différent 
     if(user==trimmedName){
        isSentByCurrentUser= true;
     }
    return(
        isSentByCurrentUser ? (
            <div className='messageContainer justifyEnd'>
                <h1 className='sentText pr-10'> {trimmedName} </h1>
                <div className='messageBox backgroundBlue'>
                    <h1 className='messageText colorWhite'> {ReactEmoji.emojify(text)}</h1>
                </div>
            </div>
        )
        : (
            <div className='messageContainer justifyStart'>
                <h1 className='sentText'> {user} </h1>
                <div className='messageBox backgroundLight'>
                    <h1 className='messageText colorDark'> {ReactEmoji.emojify(text)}</h1>
                </div>
            </div>
        )


    )

}


export default Message;
