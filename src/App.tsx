import React, { useState } from 'react';
import './scss/App.scss';
import {WelcomePage} from "./pages/welcome"
import {ListAndTimer} from "./pages/ListAndTimer"
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';
import {themeContext} from './context/themeContext';
import {customeBackground} from './helperFunctions/themes'


function App() {
  
  
  const [customeTheme1, setCustomeTheme1] = useState('#7394da');
  const [customeTheme2, setCustomeTheme2] = useState('#bfebe1');
  
  function getCustomeThemes(theme1: string, theme2: string,){
      setCustomeTheme1(theme1);
      setCustomeTheme2(theme2);

      localStorage.setItem('theme1', theme1);
      localStorage.setItem('theme2', theme2);
  }
  
  return (
    <themeContext.Provider value={{customeTheme1, customeTheme2, getCustomeThemes} }>
    <Routes>
      <Route path='*' element={<div className='app-screen' style={customeBackground()}><WelcomePage/><Footer/></div>}/>
      <Route path='Todos-and-pomodoro' element={<div className='app-screen' style={customeBackground()}><ListAndTimer/><Footer/></div>}/>
    </Routes>
    
    </themeContext.Provider>
    
  )
}

export default App;
