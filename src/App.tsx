import { useContext, useEffect, useReducer, useRef } from 'react';
import './scss/App.scss';
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';
import {ThemeContext} from './context/themeContext';
import { Main } from './pages/Main';

import { WelcomePage } from './pages/Welcome';
import ThemeProvider from './context/themeProvider'
import { useTheme } from './hooks/useTheme';


function App() {

  const theme = useTheme();
  const {themeColors,appScreen, setSavedCustomeThemes} = theme;

  useEffect(()=>{
    setSavedCustomeThemes();
  },[])


  return (
    <ThemeProvider value={theme}>
    <Routes>

      <Route path='*' element={<div className='app-screen' ref={appScreen}
      style={{background:`radial-gradient(circle, ${themeColors.innerColor} 0%, ${themeColors.outerColor} 100%)`}}
      >
        <WelcomePage/>
        <Footer themeColors={themeColors}/></div>}/>

      <Route path='todos-and-pomodoro'
        element={<div className='app-screen' ref={appScreen}
        style={{background:`radial-gradient(circle, ${themeColors.innerColor} 0%, ${themeColors.outerColor} 100%)`}}
      >
        <Main/>
        <Footer themeColors={themeColors}/></div>}/>
    </Routes>

    </ThemeProvider>
    // {/* // </ThemeContext.Provider> */}
    
  )
}

export default App;



