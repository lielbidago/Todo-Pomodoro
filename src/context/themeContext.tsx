import {createContext} from "react";

export const ThemeContext = createContext(null);

function useThemeContext(){
    const ctx = ThemeContext;
    return ctx;
}