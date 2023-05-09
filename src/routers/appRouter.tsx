import {createBrowserRouter} from "react-router-dom";
import App from '../App';
import {Main} from "../pages/Main"
import { WelcomePage } from "../pages/Welcome";

export const AppRoute = createBrowserRouter([
    {
      path: "*",
      element: <App/>,
      children: [
        {
          path: 'Todos-and-pomodoro',
          element: <Main />
        },
        {
          path: 'welcome',
          element: <WelcomePage />
        },
      ]
    },
  
  ])