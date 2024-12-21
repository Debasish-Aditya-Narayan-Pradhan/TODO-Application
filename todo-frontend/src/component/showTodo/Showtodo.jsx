import {useState,useEffect, useContext} from 'react'
import { NavLink,useParams,useLocation, useNavigate } from 'react-router'
import UserContext from '../../context/UserContext';
function Showtodo() {
  const {userId,connected,setConnected} = useContext(UserContext)
  let {trv} = useParams();
  const [rend,setRend] = useState(0);
  const navigate = useNavigate()
  function deleteById(id) {
    fetch(`http://localhost:9090/user/delete/task/${id}`)
    .then((res) =>
    {
      setRend((prev) => prev+1)
    })
  }
  const [inputValue,setInputValue] = useState("Your task")
  const [obj,setObj] = useState([])
useEffect(() =>
{
  if(!connected)
  {
    navigate("/login")
  }
  setTimeout(()=>
  {
    fetch(`http://localhost:9090/user/get/task/${userId}`)
    .then((res) => res.json())
    .then((data) => setObj(data))
  },50)
},[trv,rend])
  return (
    <div className='flex flex-col gap-5'>
        <h1 className='text-orange-500 text-3xl text-center'>Your TODO's</h1>
      <div>
        <input  type='text'  required onChange ={(e) =>
          {
            setInputValue(e.target.value)
            // if(e.target.value.length != 0) 
            // {
            //   setInputValue(e.target.value)
            // }
            // else
            // {
            //   setInputValue("task")
            // }
          }
        } className='p-4 rounded-l-xl w-96' placeholder='Enter your todo' />
        
          <NavLink
            to={`/add/${inputValue}`}>
              <button className='bg-green-500 p-4 rounded-r-xl w-28 hover:bg-green-700' onClick={() =>
                {
                  if(inputValue.length === 0) 
                  {
                    setInputValue("task");
                  }
                }
              }>
                Add
                </button>
                </NavLink>
      </div>
      <table className='border-2 text-white gap-3'>
        <thead className='border-2'>
            <tr>
            <th className='border-2 p-6'>Task</th>
            <th className='border-2 p-6'>Starting Date/Time</th>
            <th className='border-2 p-6'>Ending Date/Time</th>
            <th className='border-2 p-6'>Duration</th>
            <th className='border-2 '>Status</th>
            <th>Operation</th>
            </tr>
        </thead>
       <tbody>
            {obj.map((data,idx)=>
            {
              return ( <tr key={idx}>
            <td className='border-2 p-8'>{data.task}</td>
            <td className='border-2 p-8'>{data.startDate}</td>
            <td className='border-2 p-8'>{data.endDate}</td>
            <td className='border-2 p-8'>{data.duration}</td>
            <td className='border-2 p-8'>{data.status}</td>
            <td className='border-2 p-8'><button className='bg-green-400 rounded-lg p-2 text-white hover:bg-green-700'>
              <NavLink
            to={`/edit/${data.id}`}>
                Edit
                </NavLink></button>
                <button className='bg-red-600 p-2 rounded-lg text-white hover:bg-red-800 ml-2' onClick={() =>
                  {
                    deleteById(data.id)
                  }
                }>Delete</button>
            </td>
              </tr>)
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Showtodo
