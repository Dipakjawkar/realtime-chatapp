import React, { useState, useEffect } from 'react'
import loadingImg from '../imgs/loader.gif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useUser } from '../context/userContext';
function Signup() {
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const history = useNavigate();
  const { setLoading } = useUser();
  const inputChage = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value })

  }



  const submitHandal = async () => {
    const { email, name, password } = user;
    if (!email || !name || !password) {
      return toast('Fill all fields!')
    }
    setLoading(true)
    try {
      const res = await axios.post('/api/v1/user/signup', { email, name, password })
      if (res.data.success === true) {
        setLoading(false)
        toast("User signup successful!")
        history('/signin')
      } else {
        toast(res.data.message)
      }
      setLoading(false)
    } catch {
      setLoading(false)
      toast('Error !')
    }
    setUser({ email: "", name: "", password: "" })
  }


  return (
    <div className="main" style={{ flexDirection: "row-reverse" }}>
      <div
        className="left-main"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="card">
          <h1 className="card-title"> Signup</h1>
          <div className="card-info">
            <div className="lable">Name</div>
            <input type="text" value={user.name} name="name" onChange={inputChage} />
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
              <div className="btn" onClick={submitHandal}>SIGNUP</div>
            </div>
            <br />
            <div onClick={() => history("/signin")} style={{ textAlign: "center" }}> i have an account ! SignIn</div>
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
            alt="loading"
          />
        </div>
      </div>
    </div>
  )
}

export default Signup