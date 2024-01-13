import React, { useState } from 'react'
import loadingImg from '../imgs/loader.gif'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios'
import { useUser } from '../context/userContext';
function Signin() {
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const history = useNavigate();
  const {setLoading} = useUser();
  const inputChage = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value })
 
  }
  const submitHandal = async () => {
    const { email, password } = user;
    if (!email || !password) {
      return toast('please fill all fields !')
    }
    setLoading(true)
    try {
      const res = await axios.post('api/v1/user/signin', { email, password })
      if (res.data.success === true) {
        setLoading(false)
        toast("User Signin successful !");
        console.log(res.data)
        localStorage.setItem('login-user',JSON.stringify(res.data.user))
        history('/chat')
      } else {
        setLoading(false)
        toast(res.data.message);

      }
    } catch {
      setLoading(false)
    toast('Error !')
    }
    setUser({ email: "", password: "" })
  }



  return (
    <div className="main" style={{ flexDirection: "row-reverse" }}>
      <div
        className="left-main"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="card">
          <h1 className="card-title"> Signin</h1>
          <div className="card-info">
            <div className="lable">Email</div>
            <input onChange={inputChage} type="email" value={user.email} name="email" />
            <div className="lable">Password</div>
            <input onChange={inputChage} type="password" value={user.password} name="password" />
            <br />
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div className="btn" onClick={submitHandal}>SIGNIN</div>
            </div>
            <br />
            <div onClick={() => history("/")} style={{ textAlign: "center" }}> i have no account ! SignIn</div>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        className="right-main"
      >
        <div>
          <img
            style={{ filter: "hue-rotate(-34deg)", width: 300 }}
            src={loadingImg}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default Signin