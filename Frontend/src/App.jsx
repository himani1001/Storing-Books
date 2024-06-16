import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ToBeRead from './pages/ToBeRead';
import ShowBook from './pages/ShowBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element= {<ToBeRead />}/>
      <Route path='/books/details/:id' element= {<ShowBook />}/>
    </Routes>
  );
};

export default App