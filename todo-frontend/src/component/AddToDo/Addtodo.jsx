import { useState, useRef, useContext, useEffect } from "react";
import { Navigate, NavLink,useNavigate } from "react-router";
import { useParams } from "react-router";
import UserContext from "../../context/UserContext";

function Addtodo() {
  const a = Math.floor((Math.random*10+1))
  const {userId,connected,setConnected} = useContext(UserContext)
  const navigate = useNavigate();
  const { task } = useParams(); // Get task from route params
  const [t, setT] = useState(task); // Set initial value for task
  const [stDate, setStDate] = useState("");
  const [enDate, setEnDate] = useState("");
  const [du, setDu] = useState("");
  const [stus, setStus] = useState("Completed"); // Default status

  async function addTask() {
    const obj = {
      task: t,
      startDate: stDate,
      endDate: enDate,
      duration: du,
      status: stus,
    };

    // Fetch call to add task
    await fetch(`http://localhost:9090/user/add/task/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
          //alert("Task added successfully!");
        } else {
          throw new Error("Failed to add task.");
        }
      }).then((data) =>
      {
        setTimeout(() => {
          navigate(`/show`);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error:", err);
        //alert("Failed to add task.");
      });
  }
  useEffect(() =>
  {
    if(!connected)
    {
      navigate("/login")
    }
  },[])
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-orange-400 text-3xl">Add your Todo's</h1>
      <input
        type="text"
        className="p-4 rounded-xl w-96"
        placeholder="Enter your task"
        value={t}
        onChange={(e) => setT(e.target.value)}
        required
      />
      <input
        type="date"
        className="p-4 rounded-xl"
        placeholder="Enter starting date/time"
        value={stDate}
        onChange={(e) => setStDate(e.target.value)}
        required
      />
      <input
        type="date"
        className="p-4 rounded-xl"
        placeholder="Enter ending date/time"
        value={enDate}
        onChange={(e) => setEnDate(e.target.value)}
        required
      />
      <input
       type="text"
        className="p-4 rounded-xl"
        placeholder="Enter duration"
        value={du}
        onChange={(e) => setDu(e.target.value)}
        required
      />
      <select
        className="p-4 rounded-xl"
        value={stus}
        onChange={(e) => setStus(e.target.value)}
        required
      >
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
      <div className="text-center">
        <NavLink to={`/show`}>
          <button
            className="bg-green-500 p-4 rounded-xl w-52 hover:bg-green-700"
            onClick={(e) => {
              // e.preventDefault(); // Prevent immediate redirection
              addTask(); // Add task
            }}
          >
            Add
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Addtodo;
