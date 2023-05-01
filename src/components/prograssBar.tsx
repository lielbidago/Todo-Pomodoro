import { useRef } from "react";
import { Overlay, ProgressBar, Tooltip } from "react-bootstrap";

interface prograssBarProps{
    progressValue: number,
    themeColors,
    toggleHelpTips: boolean
}

export function ProgressBarP(props: prograssBarProps){
    
    const {progressValue, themeColors, toggleHelpTips} = props;
    const {buttonColor} = themeColors
    const pbRef = useRef(null)
    return (
        <div className={`ProgressBarP ${buttonColor}`}>
            <div ref={pbRef} className='PB-container'>
                <h6>Your progress</h6>
                <ProgressBar variant='' now={progressValue} label={`${progressValue}%`}/>
            </div>
            <Overlay target={pbRef.current} show={toggleHelpTips} placement='bottom'>
                        {(props) => (
                            <Tooltip {...props}>
                                shows your progression
                            </Tooltip>
                        )} 
            </Overlay>
        </div>

        
        )
}