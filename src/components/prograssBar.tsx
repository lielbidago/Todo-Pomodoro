import { ProgressBar } from "react-bootstrap";

interface prograssBarProps{
    progressValue: number
}

export function ProgressBarP(props: prograssBarProps){
    
    const {progressValue} = props;
    
    return <div className="ProgressBarP">
        <h6>Your progress</h6>
        <ProgressBar variant='dark' now={progressValue} label={`${progressValue}%`}/>
        </div>
}