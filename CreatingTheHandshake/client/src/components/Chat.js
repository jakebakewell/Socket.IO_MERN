import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [socket] = useState(() => io(':8000'));
    const [message, setMessage] = useState({
        message: ""
    });
    const [chat, setChat] = useState([]);
    useEffect(() => {
        console.log('Is this running?');
        socket.on('Welcome', data => console.log(data));
        socket.on("Updating", data => setChat(data));
        return () => socket.disconnect(true);
    }, [socket]);
    const clickHandler = () => {
        console.log("button has been clicked");
        socket.emit("event_from_client", message);
        setMessage({
            message: ""
        })
    }
    const changeHandler = (e) => {
        setMessage({
            ...message,
            message: e.target.value
        });
    }
    return (
        <div>
            <h1>Socket Test</h1>
            <input type="text" onChange={changeHandler} value={message.message}></input>
            <button onClick={clickHandler}>Click Me!</button>
            {chat.map((message, i) => <p key={i}>{message}</p>)}
        </div>
    );
};

export default Chat;