import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './input.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
    try {
      const storeData = await axios.get('http://localhost:5000/users');
      setData(storeData.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
  }, [])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className=' text-red-500 text-lg'>hello world</p>
      {data.length > 0 ? (
        <ul>
          {data.map((user) => {
            <li key={user._id}>
              {user.name} and {user.email}
            </li>
          })}
        </ul>
      ) : (
        <p>No user/s found.</p>
      )}
    </>
  )
}

export default App
