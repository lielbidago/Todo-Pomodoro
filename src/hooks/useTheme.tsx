import { useReducer, useRef } from "react";
import { IThemeAction, IthemeColors, buttonColortype } from "./useThemeTypes";

export const buttonColor = {
    dark:'dark',
    light:'light'
} as const 
  
export const ThemeReducerActions = {
    changed_theme_colors:'changed_theme_colors'
} as const
  
export function customeBackground(customeTheme1:string,customeTheme2:string){
    return ({background: `radial-gradient(circle, ${customeTheme1} 0%, ${customeTheme2} 100%)`})
}

function hexToRgb(hex:string){
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
      
    return { r, g, b };
}

function CalculateLuminance(rgbcolor:{r:number,g:number,b:number}){
    return 0.2126 * rgbcolor['r'] + 0.7152 * rgbcolor['g'] + 0.0722 * rgbcolor['b']
}

export function getButtonsColor(color1:string, color2:string):buttonColortype{

    const color1rgb = hexToRgb(color1);
    const color2rgb = hexToRgb(color2);


    if (CalculateLuminance(color1rgb)<140 || CalculateLuminance(color2rgb)<140){
        return 'light'
    }

    return 'dark'
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

export function useTheme(){

    const appScreen = useRef<HTMLDivElement>(null);
    const defaultTheme:IthemeColors = {outerColor:'#70e1c6', innerColor:'#d45454', buttonColor:buttonColor.dark}
    const [themeColors, dispatchTheme] = useReducer(themeColorsReducer, defaultTheme);
    const transparentby = 'b6';
  
    function setCustomeThemes(innerColor: string, outerColor: string){
  
      const usersTheme = {innerColor, outerColor, buttonColor:getButtonsColor(outerColor,innerColor)};
      dispatchTheme({type:ThemeReducerActions.changed_theme_colors, payload:usersTheme })
      if (appScreen.current){
        appScreen.current.style.setProperty('--themeOuter', outerColor+transparentby);
        appScreen.current.style.setProperty('--themeInner', innerColor+transparentby);
      }

  
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
      
      if (appScreen.current){
        appScreen.current.style.setProperty('--themeOuter', outer+transparentby);
        appScreen.current.style.setProperty('--themeInner', inner+transparentby);
      }
    }

    return ({setSavedCustomeThemes,setCustomeThemes, appScreen, themeColors })
}