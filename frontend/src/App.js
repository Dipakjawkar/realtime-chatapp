import React from "react";
import { Route, Routes, useNavigate, } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Chat from "./componets/Chat";
import Signin from "./componets/Signin";
import Signup from "./componets/Signup";
import { useUser } from "./context/userContext";
import { LinearProgress } from "@mui/material";


function App() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  // Check if user is not logged in and redirect to login


  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
       { loading && <LinearProgress />}

      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route path="/" element={<Signup />} />
      </Routes>
     

    </div>
  );
}

export default App;
