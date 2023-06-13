import {useState} from 'react';

export function useSettings(){
    const [showSettings, setShowSettings] = useState(false);
    const toggleShowSettings = () => setShowSettings(!showSettings);

    return {
        showSettings,
        toggleShowSettings
    }
    
}

