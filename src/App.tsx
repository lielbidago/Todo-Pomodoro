import { useEffect, useReducer } from 'react';
import './scss/App.scss';
import  {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/footer';
import {ThemeContext} from './context/themeContext';
import { WelcomePage } from './pages/welcome';
import { Main } from './pages/Main';
import { getButtonsColor } from './helperFunctions/themes';

const buttonColor = {
  dark:'dark',
  light:'light'
 } as const 

export type buttonColortype = keyof typeof buttonColor

 const ThemeReducerActions = {
  changed_theme_colors:'changed_theme_colors'
} as const



export interface IthemeColors{
  outerColor:string,
  innerColor:string, 
  buttonColor: keyof typeof buttonColor
};

interface IThemeAction{
  type: keyof typeof ThemeReducerActions,
  payload: IthemeColors
}

function themeColorsReducer(colors:IthemeColors, action: IThemeAction){
  
  switch(action.type){
    case ThemeReducerActions.changed_theme_colors:
      return {
        outerColor: action.payload.outerColor,
        innerColor: action.payload.innerColor,
        buttonColor: getButtonsColor(colors.innerColor, colors.outerColor)
      };
    default:
      throw Error('Unknown action.');
      
  }
}

function App() {

  const defaultTheme:IthemeColors = {outerColor:'#bfebe1', innerColor:'#7394da', buttonColor:buttonColor.dark}
  const [themeColors, dispatchTheme] = useReducer(themeColorsReducer, defaultTheme);

  function setCustomeThemes(innerColor: string, outerColor: string){

    const usersTheme = {innerColor, outerColor, buttonColor:getButtonsColor(outerColor,innerColor)};
    dispatchTheme({type:ThemeReducerActions.changed_theme_colors, payload:usersTheme })

    localStorage.setItem('innerColor', innerColor);
    localStorage.setItem('outerColor', outerColor);
  }

  function setSavedCustomeThemes(){
    
    const inner: string = localStorage.getItem('innerColor') || themeColors.innerColor
    const outer: string = localStorage.getItem('outerColor') || themeColors.outerColor
    
    let usersTheme = 
      {innerColor: inner,
      outerColor: outer,
      buttonColor: getButtonsColor(inner,outer)
    };

    dispatchTheme({type:ThemeReducerActions.changed_theme_colors, payload:usersTheme})

  }

  //"fetch" from local storage
 

  useEffect(()=>{
    setSavedCustomeThemes()
  },[])


  return (
    <ThemeContext.Provider value={{themeColors, setCustomeThemes} }>
    <Routes>

      <Route path='*' element={<div className='app-screen'
      style={{background:`radial-gradient(circle, ${themeColors.innerColor} 0%, ${themeColors.outerColor} 100%)`}}
      >
        <WelcomePage/>
        <Footer themeColors={themeColors}/></div>}/>

      <Route path='todos-and-pomodoro'
        element={<div className='app-screen'
        style={{background:`radial-gradient(circle, ${themeColors.innerColor} 0%, ${themeColors.outerColor} 100%)`}}
      >
        <Main/><Footer themeColors={themeColors}/></div>}/>
    </Routes>
    
    </ThemeContext.Provider>
    
  )
}

export default App;



