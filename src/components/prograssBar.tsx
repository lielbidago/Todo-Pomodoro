import { ProgressBar } from "react-bootstrap";

interface prograssBarProps{
    progressValue: number,
    buttonColor:string
}

export function ProgressBarP(props: prograssBarProps){
    
    const {progressValue, buttonColor} = props;
    
    return <div className={`ProgressBarP ${buttonColor}`}>
        <h6>Your progress</h6>
        <ProgressBar variant='' now={progressValue} label={`${progressValue}%`}/>
        </div>
}