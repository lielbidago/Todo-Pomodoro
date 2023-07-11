import { useEffect, useMemo, useRef } from "react";
import { Overlay, ProgressBar, Tooltip } from "react-bootstrap";
import { IthemeColors } from "../hooks/useThemeTypes";
import { ItodosListState } from "../hooks/useTodoListTypes";


interface prograssBarProps{
    // progressValue: number,
    todosCompState:ItodosListState,
    themeColors:IthemeColors,
    toggleHelpTips: boolean
}
function progressValue(completedNum:number,allNum:number ){
    return Math.round((completedNum/allNum)*100)
}
export function ProgressBarP(props: prograssBarProps){
    // progressValue,
    const {todosCompState ,themeColors, toggleHelpTips} = props;
    const {buttonColor} = themeColors
    const pbRef = useRef(null)
    let currentProgressValue = progressValue(todosCompState.completedNum, todosCompState.allNum)

    // useEffect(()=>{
    //     let currentProgressValue = progressValue(todosCompState.completedNum, todosCompState.allNum)

    // }, [todosCompState.allNum, todosCompState.completedNum])

    const currentProgressMemo = useMemo(()=>(
        progressValue(todosCompState.completedNum, todosCompState.allNum)
    ),[todosCompState]);

    return (
        <div className={`ProgressBarP ${buttonColor}`}>
            <div ref={pbRef} className='PB-container'>
                <h6>Your progress</h6>
                <ProgressBar variant='' now={currentProgressMemo} label={`${currentProgressMemo}%`}/>
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