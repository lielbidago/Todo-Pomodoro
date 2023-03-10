import { Link } from "react-router-dom";
import {customeBackground} from '../helperFunctions/themes'

export function WelcomePage(){
    
    
    return (
        <div className="welcome-page" style={customeBackground()}>
            <div className="welcomediv">
                <h4>Hello, welcome to</h4>
                <h1>Todo Pomodoro!</h1>
                <p>Here you can enter your tasks into a todo list and create a timeline for compilation,<br/>
                     that you'll complete using our pomodoro timer</p>
                <Link role="button" type="button" className="start btn btn-outline-dark" to={`/Todos-and-pomodoro`}>START</Link>
            </div>
        </div>
    )
}