import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './component/Home.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Login from './component/Login.jsx'
import Layout from './component/Layout.jsx'
import Addtodo from './component/AddToDo/Addtodo.jsx'
import Edittodo from './component/EditToDo/Edittodo.jsx'
import Showtodo from './component/showTodo/Showtodo.jsx'
import Register from './Register.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='show' element={<Showtodo/>}/>
      <Route path='add/:task' element={<Addtodo />}/>
      <Route path='edit/:taskId' element={<Edittodo/>}/>
      {/* </Route> */}
      
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserContextProvider>
   <RouterProvider router={route} />
   </UserContextProvider>
    
   
  </StrictMode>,
)
