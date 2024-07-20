import { useEffect, useState } from 'react';
import './App.css';
import './output.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './pages/Create';
import Update from './pages/Update';
import Details from './pages/Details';
import Home from './pages/Home';

function App() {
  <Router>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/create' element={<Create />}></Route>
      <Route path='/details:id' element={<Details />}></Route>
      <Route path='/update:id' element={<Update />}></Route>
    </Routes>
  </Router>
}

export default App;
