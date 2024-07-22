import React from 'react'
import { useEffect, useState } from 'react';
import { useParam, useNavigate } from 'react-router-dom';
import axios from 'axios'


const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  useEffect(() => {
   const fetchItemDetails = async() => {
    try {
      const getData = await axios.get(`http://localhost:5000/items/${id}`);
      setItem(getData.data);
    }
    catch(error) {
      console.log(error);
    }
   }
   fetchItemDetails();

  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/')
  } 

  if (!item) {
    return <div>No Items found.</div>
  }


  return (
    <div>Update
      <h1>{id}</h1>
      <h1>{item.email}</h1>
      <h1>{item.name}</h1>
    </div>
  )
}

export default Update