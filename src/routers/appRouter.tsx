import {createBrowserRouter} from "react-router-dom";
import App from '../App';
import {ListAndTimer} from "../pages/ListAndTimer"
import { WelcomePage } from "../pages/welcome";

export const AppRoute = createBrowserRouter([
    {
      path: "*",
      element: <App/>,
      children: [
        {
          path: 'Todos-and-pomodoro',
          element: <ListAndTimer />
        },
        {
          path: 'welcome',
          element: <WelcomePage/>
        },
      ]
    },
  
  ])