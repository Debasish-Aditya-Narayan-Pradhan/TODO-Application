import React from 'react'
import {Link,NavLink} from 'react-router'
function Home() {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-center text-orange-500 text-3xl'> Welcome to TODO-APP</h1>
      <NavLink 
      to="/register"
      className={() =>
      {
       return  "text-3xl bg-green-600 p-4 w-56 rounded-xl text-white"
      }
      }>
        Register
      </NavLink>
      <NavLink 
      to="/login"
      className={() =>
      {
       return  "text-3xl bg-green-600 p-4 w-56 rounded-xl text-white"
      }
      }>
        Login
      </NavLink>
    </div>
  )
}

export default Home
