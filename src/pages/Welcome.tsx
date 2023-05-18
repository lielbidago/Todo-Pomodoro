import { Link } from "react-router-dom";

export default function Welcome(){
    
    return (
        <div className="welcome-page" >
            <div className="welcomediv">
                <h4>Hello, welcome to</h4>
                <h1>PomodoTodo</h1>
                <p>Welcome to Todo-Pomodoro! 
                    Manage your tasks and increase your productivity. 
                    With PomodoTodo, you can create and manage your to-do list, 
                    and track your progress. 
                    The Pomodoro timer helps you stay focused and work in concentrated bursts, 
                    which has been shown to increase productivity and reduce procrastination.</p>
                     
                <Link role="button" type="button" className="start btn btn-outline-dark" to={`todos-and-pomodoro`}>START</Link>

            </div>
        </div>
    )
};
