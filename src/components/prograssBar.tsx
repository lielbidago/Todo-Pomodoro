import { useRef } from "react";
import { Overlay, ProgressBar, Tooltip } from "react-bootstrap";

interface prograssBarProps{
    progressValue: number,
    buttonColor:string,
    toggleHelpTips: boolean
}

export function ProgressBarP(props: prograssBarProps){
    
    const {progressValue, buttonColor, toggleHelpTips} = props;
    const pbRef = useRef(null)
    return (
        <div className={`ProgressBarP ${buttonColor}`}>
            <div ref={pbRef} >
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