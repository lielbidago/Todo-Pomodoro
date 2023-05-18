import { ReactNode} from "react";
import { ThemeContext } from "./themeContext";
import { IthemeColors } from "../hooks/useThemeTypes";



interface IThemeProviderProps{
    children: ReactNode
    value:{
        themeColors:IthemeColors,
        appScreen: React.MutableRefObject<HTMLDivElement|null>,
        setCustomeThemes(innerColor: string, outerColor: string):void,
        setSavedCustomeThemes():void
    }
}
export default function ThemeProvider({children, value}:IThemeProviderProps, ){

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )

}