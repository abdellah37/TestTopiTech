import React,{useEffect,useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar.js';
import './Chat.css';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js';




let socket;


const Chat = ({ location }) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000';
// la une fois que l'utilisateur login je recupére  les deux parametres et je les envoie au backend en utilisant 
//le serveur socket et le hook useeffect
    useEffect( () => {
        const { name , room } = queryString.parse(location.search);
        socket= io(ENDPOINT);
        setName(name);
        setRoom(room);
       socket.emit('join', { name , room }  , () => {

       });

       return () => {
           socket.emit('disconnect');
           socket.off();
       }

    } , [ENDPOINT,location.search])
// ce hook la est résponsable de l'ajout des nouveaux message a la liste des messages 
    useEffect( () => {
        socket.on('message' , (message) => {
            setMessages([...messages,message]);
        })  
        
    },[messages]);
// pour ce hook envoie le message taper a la partie backend qui va le traiter et l'envoyer au FrontEnd afin
// d'assurer l'affichage du message
    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message , () => setMessage('') )
        }

    }

    console.log(messages,message)
    return(

        
        <div className='outerContainer'>
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input  message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                
             {/*<input
             value={message} 
             onChange={(event) => setMessage(event.target.value)}  
             onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null }
             />*/}
            </div>
        </div>
        
    )
}
export default Chat;
