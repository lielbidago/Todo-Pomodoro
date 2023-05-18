import { Link } from "react-router-dom";

export default function Welcome(){
    
    return (
        <div className="welcome-page" >
            <div className="welcomediv">
                <h4>Hello, welcome to</h4>
                <h1>PomodoTodo</h1>
                <p>Here you can enter your tasks into a todo list and create a timeline for compilation,<br/>
                     that you'll complete using our pomodoro timer</p>
                     
                <Link role="button" type="button" className="start btn btn-outline-dark" to={`todos-and-pomodoro`}>START</Link>

            </div>
        </div>
    )
};
