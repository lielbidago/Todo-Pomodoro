import {createContext} from "react";

export const ThemeContext = createContext<any>(null);

function useThemeContext(){
    const ctx = ThemeContext;
    return ctx;
}