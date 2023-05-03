import React, { useEffect, useReducer, useRef } from 'react';
import './scss/App.scss';
import {WelcomePage} from "./pages/welcome" ;
import {Main} from "./pages/Main";
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';
import {ThemeContext} from './context/themeContext';
import {getButtonsColor} from './helperFunctions/themes'

interface IthemeColors{
  outerColor:string,
  innerColor:string, 
  buttonColor:string
};

function themeColorsReducer(colors:IthemeColors, action){
  
  if (action.type === "changed_theme_colors"){
    return {
      outerColor: action.payload.outerColor,
      innerColor: action.payload.innerColor,
      buttonColor: getButtonsColor(colors.innerColor, colors.outerColor)
    };
  }else{
    throw Error('Unknown action.');
  }
  
}

function App() {

  const [themeColors, dispatch] = useReducer(themeColorsReducer,
    {outerColor:'#bfebe1', innerColor:'#7394da', buttonColor:'dark'});

  function setCustomeThemes(innerColor: string, outerColor: string){

    const usersTheme = {innerColor, outerColor};
    dispatch({type:"changed_theme_colors", payload:usersTheme })

    localStorage.setItem('innerColor', innerColor);
    localStorage.setItem('outerColor', outerColor);
  }

  function setSavedCustomeThemes(){
    
    const inner = localStorage.getItem('innerColor')
    const outer = localStorage.getItem('outerColor')

    const usersTheme = 
      {innerColor: inner? inner: themeColors.innerColor,
      outerColor: outer? outer: themeColors.outerColor};

    dispatch({type:"changed_theme_colors", payload:usersTheme})

  }

  const appScreen = useRef(null)


  useEffect(()=>{
    setSavedCustomeThemes()
  },[])

  useEffect(()=>{
    appScreen.current.style.background = `radial-gradient(circle, ${themeColors.innerColor} 0%, ${themeColors.outerColor} 100%)`
  }, [themeColors])


  
  return (
    <ThemeContext.Provider value={{themeColors, setCustomeThemes} }>
    <Routes>

      <Route path='*' element={<div className='app-screen' ref={appScreen}>
        <WelcomePage/>
        <Footer themeColors={themeColors}/></div>}/>

      <Route path='todos-and-pomodoro' element={<div className='app-screen' ref={appScreen}
      >
        <Main/><Footer themeColors={themeColors}/></div>}/>
    </Routes>
    
    </ThemeContext.Provider>
    
  )
}

export default App;



