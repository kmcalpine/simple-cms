import { useState } from 'react'
import './App.css'
import { AxiosInstanceProvider } from './context/Axios'
import { Login } from './pages/auth/login/Login'

function App() {
  const [count, setCount] = useState(0)
  const arr = [0,1,2,3]

  return (
    <div className="App">
      <AxiosInstanceProvider
        config={{baseURL: "http://localhost:8002"}}
        requestInterceptors={[]}
        responseInterceptors={[]}
      >
        <Login />
      </AxiosInstanceProvider>
    </div>
  )
}

export default App
