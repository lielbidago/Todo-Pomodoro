import React from 'react';
import './App.scss';
import {WelcomePage} from "./pages/welcome"
import {ListAndTimer} from "./pages/ListAndTimer"
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';



function App() {
  return (
    <>
    <Routes>
      <Route path='*' element={<WelcomePage/>}/>
      <Route path='Todos-and-pomodoro' element={<ListAndTimer/>}/>
    </Routes>
    <Footer/>
    </>
    
  )
}

export default App;
