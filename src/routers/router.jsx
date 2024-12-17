import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";

const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/orders", element: <h1>Orders</h1> },
            { path: "/about", element: <h1>About</h1> },
            {
                path: "/profile",
                children: [
                    { path: '', element: <h1>Profile</h1> },
                    {
                        path: 'settings',
                        children: [
                            { path: "", element: <h1>settings</h1> },
                            { path: "change-password", element: <h1>Change Password</h1> },
                            { path: "edit-profile", element: <h1>Edit Profile</h1> },
                        ]

                    },
                    { path: 'dashboard', element: <h1>Dashboard</h1> },
                ]
            }

        ]
    }
])
export default router