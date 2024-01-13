import React, { useEffect, useRef, useState } from 'react'
import Left from './Left'
import Right from './Right'

import axios from 'axios'
import { io } from 'socket.io-client'
import { LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { toast } from 'react-toastify'

function Chat() {
    const [users, setUsers] = useState("");
    const { setLoading } = useUser();
    const [chats, setChats] = useState("");
    const [socket, setSocket] = useState(null);
    const [receiver, setReceiver] = useState({ id: "", name: "" });
    
    const history = useNavigate()
    const scllordown = useRef();
    const [iam, setIam] = useState();

    const fetchUser = async () => {
        setLoading(true)
        try {
            const user = await axios.get('api/v1/user');
            setUsers(user.data.users);
            setIam(user.data.user)
        } catch {
            toast('error !')
        }
        setLoading(false)
    }


    useEffect(() => {
       
        if (chats) {
            const soc = io("/"); // Replace with your Socket.IO server URL
            setSocket(soc);
            soc.on('connect', () => {
                soc.emit('joinRoom', iam);
            });

            soc.on('getMessage', (message) => {
                
                setChats([...chats, { message: message, sender: receiver.id, reciver: iam }])
                console.log(message, chats)
            })
            return () => {
                soc.disconnect();
                
            };
        }
     
    }, [chats]);



    const fetchChat = async (val, name) => {
        setLoading(true)
        try {
            const chat = await axios.post('api/v1/message', {
                "reciver": val
            });
            setLoading(false)
            setReceiver({ "id": val, "name": name });
            setChats(chat.data);
           
        } catch {
            toast('error !')
        }
        setLoading(false)

    }

    const sendMessage = async (message, receiver) => {
        if (!message || !receiver) {
            return;
        }
        setChats([...chats, { message: message, sender: iam, reciver: receiver }])
        socket.emit('sendMsg', {
            message, to: receiver
        })
        setLoading(true)
        try {
            await axios.post('api/v1/message/send', {
                message: message,
                reciver: receiver
            });
        } catch {
            toast('error !')
        }
        setLoading(false)
    }



    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const chatContainer = scllordown.current;

        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chats]);

    return (
        <div className="main">
            <LinearProgress color="primary" variant="indeterminate" />
            <Left users={users} fetchChat={fetchChat} />
            <Right setChats={setChats} chats={chats} scllordown={scllordown} receiver={receiver} sendMessage={sendMessage} />
        </div>
    )
}

export default Chat;
