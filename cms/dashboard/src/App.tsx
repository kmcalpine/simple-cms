import { useState } from 'react'
import './App.css'
import { Login } from './pages/auth/login/Login'

function App() {
  const [count, setCount] = useState(0)
  const arr = [0,1,2,3]

  return (
    <div className="App">
      <Login />
    </div>
  )
}

export default App
