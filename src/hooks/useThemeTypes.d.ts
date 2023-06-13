import { ReactNode } from 'react';
import {buttonColor, ThemeReducerActions} from './useTheme';

export type buttonColortype = keyof typeof buttonColor;

export interface IthemeColors{
    outerColor:string,
    innerColor:string, 
    buttonColor: buttonColortype
}

export interface IThemeAction{
    type: keyof typeof ThemeReducerActions,
    payload: IthemeColors
}

export interface IThemeProviderProps{
    children: ReactNode
}