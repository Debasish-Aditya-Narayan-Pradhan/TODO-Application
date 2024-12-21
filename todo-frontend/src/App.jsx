import { useState } from 'react'
import {Link, NavLink} from 'react-dom'
import './App.css'
import Showtodo from './component/showTodo/Showtodo.jsx'
import Edittodo from './component/EditToDo/Edittodo.jsx'
import Addtodo from './component/AddToDo/Addtodo.jsx'
import UserContextProvider from '../../miniContext_Api/src/context/UserContextProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
  
     <div className='text-white'>
      Login
     </div>
  )
}

export default App
