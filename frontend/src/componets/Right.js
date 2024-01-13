import React, { useState } from 'react'
import roboImg from '../imgs/robot.gif'
import { useUser } from '../context/userContext';
import { toast } from 'react-toastify';
import userImg from '../imgs/3d.avif'

function Right({ chats, receiver, sendMessage, scllordown, setChats , setChatView}) {

    const { user } = useUser();
    const [message, setMessage] = useState("");

    const messageChange = (e) => {
        setMessage(e.target.value);
    }

    

    const submitHandal = () => {
        sendMessage(message, receiver.id);
        setMessage("");
    }

    return (
        <div className="right-main">
            {/* <div className="login-user">{ user && <>{user.name}</>}</div> */}
            {  chats && 
            <div className="top-bar"> {receiver && <>{receiver.name} <div className="btn" onClick={()=>setChats("")}>Cancel</div></>}</div>
            }

            <div className="chat-div">
                <div className="chat-data" ref={scllordown}>
                    {chats && chats.length !== 0 ? ( chats.map((val, index) => {
                            return <div key={index}>

                                {
                                    receiver.id !== val.reciver ? <>
                                        <div className="second-user" >
                                            {/* <img
                                                src={userImg}
                                                alt="reciver img"
                                            /> */}
                                            <div className="message"> {receiver.name} : {val.message}</div>
                                        </div>

                                    </> : <>
                                        <div className="first-user">
                                            <div className="message">{val.message} : You</div>
                                        </div>
                                        {/* {console.log(receiver, val.receiver)} */}

                                    </>
                                }

                            </div>
                        })
                    ) : <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><img src={roboImg} alt='robo' /> </div>

                    }
                    

                </div>

                {chats && <div className="chat-input">
                    <input className="input-message" value={message} onChange={messageChange} type="text" />
                    <div className="btn" onClick={submitHandal}>Send</div>
                </div>}
            </div>
        </div >
    )
}

export default Right