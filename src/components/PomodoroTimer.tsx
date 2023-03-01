import { useEffect } from "react";

interface PomodoroTimer{
    timer: number,
    timerMode: string,
    startTimer,
    timerStatus:boolean,
    changeTime,
    pauseTimer,
    resumeTimer
    
}

function formatTimer(timer: number){
    let hours = Math.floor(timer/3600)
    let minutes = Math.floor((timer-hours*3600)/60)
    let seconds = Math.floor(timer-(minutes*60+hours*3600))

    return `${hours}:`.padStart(3,'0') +
     `${minutes}:`.padStart(3,'0') + 
      `${seconds}`.padStart(2,'0');
}

export function PomodoroTimer(props:PomodoroTimer){
    
    const {timer, timerMode, startTimer, timerStatus,changeTime, pauseTimer, resumeTimer } = props

    const I = useEffect(()=>{
        if(timerStatus){
            const interval = setInterval(() => {
                changeTime()
            }, 1000);

        return () => clearInterval(interval);
        }
    }, [timer, timerStatus])

    console.log(`interval id:`,I)
    
    // return (
    //     <div className="pomodoro-timer card bg-transparent col-9">
    //         <div className="timerTitle">
    //             <h2>{timerMode}</h2>
    //         </div>
    //         <div className="timerMain">
    //             <h3>{formatTimer(timer)}</h3>
    //             <div className="timerButtons ">
    //                 {timerStatus? <button className='btn btn-outline-light' onClick={pauseTimer}>pause</button>: 
    //                 <button className='btn btn-outline-light' onClick={resumeTimer}>resume</button>}
                    
    //                 <button className='btn btn-outline-light' onClick={startTimer}>{'start'}</button>
    //             </div>
    //         </div>

    //     </div>
    // )

    return (
        <div className="pomodoro-timer card bg-transparent border-light mb-3 col-9">
            <div className="card-body">
                <h5 className="card-title">{timerMode}</h5>
                <h6 className="card-subtitle mb-2 text-light">{formatTimer(timer)}</h6>
                <div className="timerButtons">
                    {timerStatus? <button className='btn btn-outline-light' onClick={pauseTimer}>pause</button>: 
                    <button className='btn btn-outline-light' onClick={resumeTimer}>resume</button>}
                    
                    <button className='btn btn-outline-light' onClick={startTimer}>{'start'}</button>
                 </div>
            </div>
        </div>
    );
}