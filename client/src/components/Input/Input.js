import React from 'react'

import './Input.css';



const Input = ({message , setMessage , sendMessage}) => {

    return(
    <form className='form'>
      <input className='input'
      value={message} 
      onChange={(event) => setMessage(event.target.value)}  
      onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null }
      />
      <button className='sendButton'   onClick={(event) => sendMessage(event)} > send </button>
    </form>
    )

}


export default Input;
