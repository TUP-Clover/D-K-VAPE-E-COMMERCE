import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './login.css';
import loginbg from './images/vapeloginbg.png';

const Login = ({ onLogin }) => {

  const [adminInput, getAdminInput] = useState ({
    username: "",
    password: ""
  })

  const [admin, setAdmin] = useState([])

  useEffect (() => {
    const allAdmin = async() => {
      
      try{
        const res = await axios.get("http://localhost:8800/admin")
        setAdmin(res.data[0])

    }catch(err) {
        console.log(err)
    }
    };
    allAdmin();
  }, [])


  const handleChange = (e) => {
    getAdminInput((prev) => ({...prev, [e.target.name]: e.target.value}))
};
  
  const handleLogin = async (e) => {
    e.preventDefault();


  
      if (adminInput.username === admin.username && adminInput.password === admin.password)
        {
        setTimeout(()=> {
          window.location.href = '/admin';
          
       }, 1000);
      }
      else {
        alert("Incorrect username or password!")
      }
};

  return ( 

    <div className='Login'>
    <img src={loginbg} alt='login-img' className='login-image'/>
    <div className='login-container'>
      <h1 className='login-header'>ADMIN LOG IN</h1>

       <form className='login-form' onSubmit={handleLogin} id="Login">

        <label form='name'>Username:</label>
        <input className='login-input' type="text" placeholder='enter your username' id="un" name="username" onChange={handleChange} />
        
        <label form='password'>Password:</label>
        <input className='login-input' type="password" placeholder="enter your password" id="pw" name="password" onChange={handleChange}/>
        
        <button className='login-button' type="submit" value="Login" >Log in</button>

      </form>
    </div>
    </div>
    
   )
  };
  


export default Login;
