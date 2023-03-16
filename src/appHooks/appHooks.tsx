import { useState } from "react";


export function AppHooks(){
    const [customeTheme1, setCustomeTheme1] = useState('');
    const [customeTheme2, setCustomeTheme2] = useState('')
    
    function getCustomeThemes(theme1: string, theme2: string,){
        setCustomeTheme1(theme1);
        setCustomeTheme2(theme2);

        localStorage.setItem('theme1', theme1);
        localStorage.setItem('theme2', theme2);
    }

    



    return {
        customeTheme1,
        customeTheme2,
        getCustomeThemes,
        
    };
}