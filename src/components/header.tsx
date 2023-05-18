
import { useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { IthemeColors } from "../hooks/useThemeTypes";

interface TodoPomodoroHeaderProps{
    handleShowSettings():void,
    themeColors:IthemeColors,
    toggleHelpTips: boolean,
    setToggleHelpTips(state:boolean):void
}

export function TodoPomodoroHeader(props:TodoPomodoroHeaderProps){
    
  const { handleShowSettings, themeColors, setToggleHelpTips, toggleHelpTips} = props;
  const menuRef = useRef(null)
  return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary TodoPomodoroHeader">
            <div className="container-fluid">
                <a className="navbar-brand" href="\"><h4 style={{color:themeColors.buttonColor==='light'? 'white':'black'}}>Todo Pomodoro</h4></a>
                <div className="header-button">
                    <button onClick={()=> setToggleHelpTips(!toggleHelpTips)}
                     style={{color:themeColors.buttonColor==='light'? 'white':'black'}} className="me-2 help ">?</button>
                    <button ref={menuRef} onClick={handleShowSettings} style={{color:themeColors.buttonColor==='light'? 'white':'black'}} className="me-2 session-settings">≡</button>
                    <Overlay target={menuRef.current} show={toggleHelpTips} placement='bottom'>
                        {(props) => (
                            <Tooltip {...props}>
                                Menu 
                                <br/>
                                and settings
                            </Tooltip>
                        )} 
                    </Overlay>
                
                </div>

            </div>
            
        </nav>
    )


}