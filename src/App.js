import './App.css'
import data from "./data/data"
import React, { useState, useEffect } from 'react'


function App() {

  const [employees, setEmployess] = useState(data)
  const [howManyEmployees, setHowManyEmployees] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [count, setCount] = useState(0)

  const deleteEmployee = (id) => {
    setEmployess(employees.filter(item => item.id !== id))
  }

  const incCount = () => {
    if(count < employees.length)setCount(count + 1)
  }

  const decCount = () => {
    if(count > 0) setCount(count - 1)
  }

  useEffect(() => {
    setHowManyEmployees(employees.slice(0,count))
  }, [count])


  return (
    <div className="App">
      <h1>Employees</h1>
      <button onClick={incCount}>plus</button>
      <div style={{"fontSize": "5rem"}}>{count}</div>
      <button onClick={decCount}>minus</button>
      <br/>
      <button onClick={() => setShowCreate(!showCreate)}>
        {
          showCreate
          ? "Close"
          : "Add"
        }
      </button>
      {
        showCreate &&
          <CreateEmployee 
            setEmployess={setEmployess}
            employees={employees}
          />
      }
      <ul>
      {
        howManyEmployees.map(item => <Employee 
          {...item}
          key={item.id}
          deleteEmployee={deleteEmployee}
          />)
      }
      </ul>
    </div>
  )
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const Employee = ({firstName, position, join, deleteEmployee, id}) => {

  const mainDivStyle = {
    "border": "1px solid white",
    "margin": "20px 0",
    "listStyle": "none",
  }

  return (
    <li style={mainDivStyle}>
      <h2>{firstName}</h2>
      <p>{position}</p>
      <p>{join}</p>
      <button onClick={() => deleteEmployee(id)}>
        Delete
      </button>
      <button>
        Edit
      </button>
    </li>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CreateEmployee = ({setEmployess, employees}) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [position, setPosition] = useState("")
  const [born, setBorn] = useState("")

  const newEmployee = () => {
    const id = Date.now()
    const join = new Date().toISOString().slice(0, 10)

    setEmployess([...employees, {id, join, firstName, lastName, position, born}])

    setFirstName("")
    setLastName("")
    setPosition("")
    setBorn("")    
  }

  return (
    <div>
      <input type="text" placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <input type="text" placeholder="Lase Name"
             value={lastName}
             onChange={e => setLastName(e.target.value)}
      />
      <input type="text" placeholder="Position"
             value={position}
             onChange={e => setPosition(e.target.value)}
      />
      <input type="date"
             value={born}
             onChange={e => setBorn(e.target.value)}
      />
      <button onClick={newEmployee}>create</button>
    </div>
  )
}

export default App