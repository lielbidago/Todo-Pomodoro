import {createBrowserRouter} from "react-router-dom";
import App from '../App';
import {Main} from "../pages/Main"
import { Welcome } from "../pages/Welcome";

export const AppRoute = createBrowserRouter([
    {
      path: "*",
      element: <App/>,
      children: [
        {
          path: 'todos-and-pomodoro',
          element: <Main />
        },
        {
          path: 'welcome',
          element: <Welcome />
        },
      ]
    },
  
  ])