import React, { useContext, useState } from 'react'
import { data, NavLink, useNavigate } from 'react-router'
import UserContext from '../context/UserContext';

function Login() {
  const[email,setEmail] = useState('');
  const[password,setpassword] = useState('');
  const[passF,setPassf] = useState(true)
  const[emailF,setEmailf] = useState(true)
  const {userId,setUserId,connected,setConnected} = useContext(UserContext)
  const navigate = useNavigate()
  function loginUser()
  {
    fetch(`http://localhost:9090/user/getUser/${email}/${password}`,{
      method:'GET'
    }).
    then((response) => {
      return response.text()
    }).then((data) =>
    {
      data = parseInt(data)
      console.log(data);
      setUserId(data)
      setConnected(true)
      if(data == 0)
      {
        setPassf(false);
        return;
      }else if(data == -1)
      {
        setEmailf(false);
        return;
      }
      else
      {
        navigate("/show");
      }
      
    }) 
  }
  const a = 1;
  return (
    <div className='flex justify-center align-middle flex-col gap-2'>
            {(passF == false) ? <h1 className='text-3xl text-red-600'>Incorrect Password</h1>:<></>}
            {(emailF == false) ? <h1 className='text-3xl text-red-600'>Incorrect Email</h1>:<></>}
        <h1 className='text-center text-3xl text-orange-400'>Login</h1>
      <form className='flex flex-col justify-center align-middle h-auto gap-2 w-96'>
        <input onChange={(e) => {setEmail(e.target.value)}} className='p-4 rounded-xl' type='text' placeholder='Enter your email' required/>
        <input onChange={(e) => {setpassword(e.target.value)}}className='p-4 rounded-xl' type='password' placeholder='Enter your password' required/>
        <div className='text-center'>
       
        <NavLink
        >
           <button onClick={() =>{loginUser()}} className='text-2xl rounded-xl bg-green-500 text-white w-48 hover:bg-green-700 p-4'>
            Login
            </button>
        </NavLink>
       
        </div>
      </form>
    </div>
  )
}

export default Login
