import React from 'react'
import loadingImg from '../imgs/loader.gif'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import userImg from '../imgs/3d img.png'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function Left({ users, fetchChat }) {
  const history = useNavigate()

  

  const onLogout = async ()=>{
    
    
    try{
      const res = await axios.get('/api/v1/user/signout')
      if(res.data.success===true){
         localStorage.removeItem('login-user')
         
         toast('Logout successful !')
         history('/')
      }
    }catch(e){
  
      toast('error !')
    }
      
  }

  return (
    <div className="left-main">
      <div className="top-bar">
        chat App
      <div className="btn" onClick={onLogout}>Logout</div>
      </div>
      {/* <div className="search-bar"><img src={loadingImg} alt=""/></div> */}
      <div className="grid-chat">

        {users && users.length !== 0 ?

          (users.map((val, index) => {
            return <div key={index}>

              <div className="chat-card" key={index} onClick={()=>fetchChat(val._id, val.name)}>
                <img
                  src={userImg}
                  alt=""
                />
                <div className="info">
                  <h3>{val.name}</h3>
                  <p>Hay How are you !</p>
                  {val.online ? <><p style={{color:"red"}} className="time">Online</p></> : <p className="time">Offline</p>}
                </div>
              </div>
            </div>
          }))
          : <>No User</>

        }

      </div>
    </div>
  )
}

export default Left