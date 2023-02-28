import React from 'react';
// import './App.css';
import {WelcomePage} from "./pages/welcome"
import {ListAndTimer} from "./pages/ListAndTimer"
import  {Route, Routes} from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path='*' element={<WelcomePage/>}/>
      <Route path='Todos-and-pomodoro' element={<ListAndTimer/>}/>
    </Routes>
  )
}

export default App;
