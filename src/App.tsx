import { useEffect, useRef, } from 'react';
import './scss/App.scss';
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';
import Main from './pages/Main';
import ThemeProvider from './context/themeProvider'
import { useTheme } from './hooks/useTheme';
import Welcome from './pages/Welcome';



function App() {

  const theme = useTheme();
  const {themeColors,appScreen, setSavedCustomeThemes} = theme;
  const welcomeref = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    setSavedCustomeThemes();
  },[])


  return (
    <ThemeProvider value={theme}>
    <Routes>

      <Route path='*' element={<div className='app-screen' ref={welcomeref}
      style={{background:`radial-gradient(circle, ${themeColors.innerColor} 0%, ${themeColors.outerColor} 100%)`}}
      >
        <Welcome/>
        <Footer themeColors={themeColors}/></div>}
      />

      <Route path='todos-and-pomodoro'
        element={<div className='app-screen' ref={appScreen}
        style={{background:`radial-gradient(circle, ${themeColors.innerColor} 0%, ${themeColors.outerColor} 100%)`}}
      >
        <Main/>
        <Footer themeColors={themeColors}/></div>}/>
    </Routes>

    </ThemeProvider>
    
  )
}

export default App;



