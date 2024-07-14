import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './output.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value }= e.target;
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const submit = await axios.post('http://localhost:5000/users', formData);
      console.log('Success')
    }catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeData = await axios.get('http://localhost:5000/users');
        setData(storeData.data);
        console.log("Connected");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [handleSubmit]);

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
      <p className=''>hello world</p>
      {data.length > 0 ? (
        <ul>
          {data.map((user) => (
            <li key={user._id} className='text-white'>
              {user.name} and {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-white'>No user/s found.</p>
      )}
      <h1 className='text-red-900'>hi kung sino ka man. i have a crush on you</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" id="" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" id="" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" id="" value={formData.password} onChange={handleChange} />
        <input type="submit" value="Submit" name='' />
      </form>
    </>
  );
}

export default App;
