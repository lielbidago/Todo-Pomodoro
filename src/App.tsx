import React from 'react';
import './scss/App.scss';
import {WelcomePage} from "./pages/welcome"
import {ListAndTimer} from "./pages/ListAndTimer"
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';
import {AppHooks} from './appHooks/appHooks';
import {appContext} from './context/appContext';
import {customeBackground} from './helperFunctions/themes'


function App() {
  
  const appAPI = AppHooks();
  

  
  return (
    <appContext.Provider value={appAPI}>
    <Routes>
      <Route path='*' element={<div className='app-screen' style={customeBackground()}><WelcomePage/><Footer/></div>}/>
      <Route path='Todos-and-pomodoro' element={<div className='app-screen' style={customeBackground()}><ListAndTimer/><Footer/></div>}/>
    </Routes>
    
    </appContext.Provider>
    
  )
}

export default App;
