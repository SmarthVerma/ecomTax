import { createBrowserRouter } from 'react-router-dom';


import {
    AdminAllUsers,
    AdminHome,
    AdminOrders,
    AdminCreateProduct,
    Product,
    Home,
    Login,
    SignUp,
    UserCart,
    UserEnterAddress,
    UserMyOrders,
    UserOrderDetails,
    UserProfile
} from "./page/index";

import Layout from "./Layouts/Layout";
import AdminLayout from "./Layouts/Admin.Layout";


export const router = createBrowserRouter([
    { path: "/", element: (<Layout>   <Home /> </Layout>) },
    { path: '/products/:id', element: (<Layout> <Product /> </Layout>) },
    { path: '/signup', element: <SignUp /> },
    { path: '/login', element: <Login /> },
    { path: '/profile/', element: <UserProfile /> },
    {
        path: "/admin", element: <AdminLayout />,
        children: [
            { path: 'home', element: <AdminHome /> },
            { path: 'create-product', element: <AdminCreateProduct /> },
            { path: 'allusers', element: <AdminAllUsers /> },
            { path: 'orders', element: <AdminOrders /> }
        ]
    },
    { path: '/myorders', element: (<Layout> <UserMyOrders /> </Layout>) },
    { path: '/order-detail/:id', element: (<Layout> <UserOrderDetails /> </Layout>) },
    { path: '/cart', element: (<Layout> <UserCart /> </Layout>) },
    { path: '/address', element: <UserEnterAddress /> }
]);