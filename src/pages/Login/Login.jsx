import axios from 'axios';
import React, { useState } from 'react';
// import useLogin from '../../hooks/useLogin';
import useTokenId from '../../hooks/useTokenId';
// import { Navigate } from 'react-router-dom';
// import socket from '../../socket';
import { LOCAL_IP} from "./../../ip";

const Login = () => {
    const { setToken, setId} = useTokenId();
    // const { setIsLogin } = useLogin();
    const [incorrect, setIncorrect] = useState(null);
    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    });

    const handleChange = (e)=>{
        console.log(e.target.name);
        setLoginData({...loginData, [e.target.name]:e.target.value});
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{

            const res = await axios.post(`http://${LOCAL_IP}:4000/api/v1/login`, loginData, {withCredentials:  true});
            console.log(res);
            if(res.data.success){
                // setIsLogin(true);
                setToken(res.data.token);
                setId(res.data.id);
                localStorage.setItem("token",res.data.token);
                // socket.connect();
                localStorage.setItem("id", res.data.id);
                window.location.reload();
            }
        }catch(err){
            if(err.request.status === 401){
                setIncorrect("Incorrect Credentials");
            }
            console.log(err);
        }
      
    }

  return (<>
        <form onSubmit={handleLogin}>
            {incorrect && <h3>{incorrect}</h3>}
    <div>
        <label>
            Username: 
        </label>
        <input type="text" value={loginData.username} onChange={handleChange} name="username" />
    </div>
    <div>
        <label >Password:</label>
        <input type="password" value={loginData.password} onChange={handleChange} name="password" />
    </div>
    <div>
        <button type='submit' >Login</button>
    </div>
    </form>
  </>
  )
}

export default Login;