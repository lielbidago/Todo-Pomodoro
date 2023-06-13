import {useMemo, useState} from 'react';
import soundbell from "../assets/achievementBell.wav";

export function useBellSound(){
    
    const [soundOn, setSoundOn] = useState(true)
    
    const timerBell = useMemo(()=> new Audio(soundbell.toString()), [])

    function toggleSoundOn(){
        setSoundOn(!soundOn)
    }

    return {soundOn, timerBell, toggleSoundOn}
}