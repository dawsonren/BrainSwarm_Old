import './App.css';
import { Student } from './components/Student/Student';
import { Teacher } from './components/Teacher/Teacher';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Student />
    },
    {
      path: "/dashboard",
      element: <Teacher />
    }
  ])
  
  return (
    <RouterProvider router={router} />
  );

}
