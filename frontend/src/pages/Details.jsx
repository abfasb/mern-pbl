import { useEffect, useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/vite.svg';
import '../App.css';
import '../output.css';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';

function Details() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', formData);
      console.log('Success');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeData = await axios.get('http://localhost:5000/users');
        setData(storeData.data);
        console.log('Connected');
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
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
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
      <p className="text-red-700">hello world</p>
      {data.length > 0 ? (
        <ul>
          {data.map((user) => (
            <li key={user._id} className="text-black p-4">
              {user.name} and {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No user/s found.</p>
      )}
      <h1 className="text-red-900">hi kung sino ka man. i have a crush on you</h1>
      <form onSubmit={handleSubmit} className='p-4 bg-blackcd'>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2"
        />
        <input type="submit" value="Submit" className="bg-red-500 text-white p-2" />
      </form>
    </>
  );
}

export default Details;
