import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={item.email} name="name" id="" />
        <input type="text" value={id} name="name" id="" />
        <input type="text" value={item.name} name="name" id="" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Update