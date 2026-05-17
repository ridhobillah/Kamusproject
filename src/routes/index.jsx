import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Translate from "../pages/Translate";
import Template from "../Template";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template/>,
        //mengisi <Outlet> di template.jsx
        children: [
            { path: "/", element: <App /> },
            { path: "/translate", element: <Translate />},
        ]
    }
]);