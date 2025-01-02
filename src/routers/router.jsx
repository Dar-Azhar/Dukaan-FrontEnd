import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckOut from "../pages/books/CheckOut";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/orderPage";
import AdminLogin from "../components/AdminLogin";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddBook from "../pages/dashboard/addBook/addBook";
import EditBook from "../pages/dashboard/editBook/editBook";
import ManageBooks from "../pages/dashboard/manageBook/ManageBooks";


const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/checkout", element: <PrivateRoute><CheckOut /></PrivateRoute> },
            { path: "/orders", element: <PrivateRoute><OrderPage /></PrivateRoute> },
            { path: "/about", element: <h1>About</h1> },
            { path: "/books/:id", element: <SingleBook /> },


        ]
    },

    {
        path: "/admin",
        element: <AdminLogin />
    },

    {
        path: "/dashboard",
        element: <AdminRoute>
            <DashboardLayout />
        </AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard /></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute>
                    <AddBook />
                </AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute>
                    <EditBook />
                </AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute>
                    <ManageBooks />
                </AdminRoute>
            }
        ]
    }
])
export default router