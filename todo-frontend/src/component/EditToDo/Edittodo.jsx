import {useState,useEffect, useContext} from 'react'
import { Navigate, NavLink,useNavigate } from 'react-router'
import { useParams } from 'react-router'
import UserContext from '../../context/UserContext'
function Edittodo() {
  const {connected,setConnected} = useContext(UserContext)
  const a = Math.floor((Math.random*10+1))
  const {taskId} = useParams()
  const [obj,setObj] = useState({})
  const navigate = useNavigate()
  const [t, setT] = useState(obj.task); // Set initial value for task
  const [stDate, setStDate] = useState(obj.startDate);
  const [enDate, setEnDate] = useState(obj.endDate);
  const [du, setDu] = useState(obj.duration);
  const [stus, setStus] = useState(obj.status);


  async function editTask(id) {
    const userEdittedTask = {
      task:t,
      startDate:stDate,
      endDate:enDate,
      duration:du,
      status:stus
    }
    await fetch(`http://localhost:9090/user/edit/task/${id}`,{
      method:'PUT',
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body:JSON.stringify(userEdittedTask)
    })
    .then((res) => 
    {
      // console.log(res.json());
      
       return res.json()
    }).then((data) =>
    {
      setTimeout(()=>
      {
        navigate(`/show`)
      },30000)
    })
  }

  useEffect(() =>
    {
      if(!connected)
      {
        navigate("/login")
        return;
      }
      fetch(`http://localhost:9090/user/get/${taskId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setObj(data || '')
        setT(data.task || '');
        setStDate(data.startDate || '');
        setEnDate(data.endDate|| '');
        setDu(data.duration || '');
        setStus(data.status || '');
      })
    },[])
    
    
  return (
    <div className='flex flex-col gap-3'>
    <h1 className='text-center text-orange-400 text-3xl'>Edit your Todo's</h1>
    <input type='text' className='p-4 rounded-xl w-96' placeholder='Enter your task' value={t} onChange={(e) => {setT(e.target.value)}}/>
    <input type="date" className='p-4 rounded-xl' placeholder='Enter starting data/time' value={stDate}  onChange={(e) => {setStDate(e.target.value)}}/>
    <input type="date" className='p-4 rounded-xl' placeholder='Enter ending data/time' value={enDate}required onChange={(e) => {setEnDate(e.target.value)}}/>
    <input type='text' className='p-4 rounded-xl' placeholder='Enter duration' value={du} required onChange={(e) => {setDu(e.target.value)}}/>
    <select className='p-4 rounded-xl' value={stus} onChange={(e) => {setStus(e.target.value)}}> 
    <option>
      Completed
    </option>
    <option>
      Pendding
    </option>
   </select>
   <div className='text-center'>
   <NavLink
            to={`/show`}>
              <button className='bg-green-500 p-4 rounded-xl w-52 hover:bg-green-700' onClick={() =>
                {
                  editTask(taskId)
                }
              }>
                Add
                </button>
                </NavLink>
   </div>
  </div>
  )
}

export default Edittodo
