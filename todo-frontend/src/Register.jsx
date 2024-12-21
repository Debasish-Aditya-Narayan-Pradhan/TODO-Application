import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
function Register() {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[flag,setFlag] = useState(true);
  const[eflag,setEflag] = useState(true);
  let num = 0;
  function userRegister() {
    const obj = {
      name:name,
      email:email,
      password:password
    }

    fetch('http://localhost:9090/user/add',{
      method:'POST',
      body:JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json', // Set proper Content-Type header
      }
    }).then((res) =>
    {
      return res.text();
    }).then((data) =>
    {
      console.log(typeof(data));
      data = parseInt(data)
      if(data == 1)
      {
        setEflag(false)
      }
      else{
        navigate("/login")
      }
      
    }).catch((err) =>
    {
      setFlag(false)
      console.log(err);
      return;
    })
  }
  return (
    <div>
      {(eflag == false) ? <h1 className='text-3xl text-red-600'>email already exist</h1>:<></>}
      {(flag == false) ? <h1 className='text-3xl text-red-600'>Something Error Happened</h1>:<></>}
      <div className='flex justify-center align-middle flex-col gap-2'>
        <h1 className='text-center text-3xl text-orange-400'>Register</h1>
      <form className='flex flex-col justify-center align-middle h-auto gap-2 w-96'>
      <input onChange={(e)=>{setName(e.target.value)}} className='p-4 rounded-xl' type='text' placeholder='Enter your name' required/>
        <input onChange={(e)=>{setEmail(e.target.value)}}className='p-4 rounded-xl' type='text' placeholder='Enter your email' required/>
        <input onChange={(e)=>{setPassword(e.target.value)}} className='p-4 rounded-xl' type='password' placeholder='Enter your password' required/>
        <div className='text-center'>
       
        <NavLink
        >
           <button onClick ={() => {userRegister()}} className='text-2xl rounded-xl bg-green-500 text-white w-48 hover:bg-green-700 p-4'>
             Register
            </button>
        </NavLink>
       
        </div>
      </form>
    </div>
    </div>
  )
}

export default Register
