import React, { useEffect, useState } from 'react';
import './scss/App.scss';
import {WelcomePage} from "./pages/welcome"
import {Main} from "./pages/Main"
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';
import {ThemeContext} from './context/themeContext';
import {customeBackground, getButtonsColor} from './helperFunctions/themes'


function App() {
  
  
  const [customeTheme1, setCustomeTheme1] = useState('#7394da');
  const [customeTheme2, setCustomeTheme2] = useState('#bfebe1');
  const [buttonColor, setButtonColor] = useState('light')
  
  // reducer - לנהל מערך של צבעים
  // לשנות לרף
  function getCustomeThemes(theme1: string, theme2: string,){
      setCustomeTheme1(theme1);
      setCustomeTheme2(theme2);

      localStorage.setItem('theme1', theme1);
      localStorage.setItem('theme2', theme2);
  }

  function setThemeColors(){
    
    const c1 = localStorage.getItem('theme1')
    const c2 = localStorage.getItem('theme2')
// לשנות לOUTER INNER
    if(c1){
      setCustomeTheme1(c1)
    }
    if(c2){
      setCustomeTheme2(c2)
    }

  }

  useEffect(()=>{
    setThemeColors()
    setButtonColor(getButtonsColor(customeTheme1, customeTheme2))
  },[customeTheme1, customeTheme2])
  
  return (
    <ThemeContext.Provider value={{customeTheme1, customeTheme2, getCustomeThemes, buttonColor, setButtonColor} }>
    <Routes>

      <Route path='*' element={<div className='app-screen'
       style={customeBackground(customeTheme1, customeTheme2)}><WelcomePage/>
       <Footer buttonColor={buttonColor}/></div>}/>

      <Route path='todos-and-pomodoro' element={<div className='app-screen' 
      style={customeBackground(customeTheme1, customeTheme2)}>
        <Main/><Footer buttonColor={buttonColor}/></div>}/>
    </Routes>
    
    </ThemeContext.Provider>
    
  )
}

export default App;
