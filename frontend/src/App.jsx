import Layout from './components/Layouts/Layout'
import Home from './page/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Product from './page/Product/Product';
import SignUp from './page/SignUp';
import CreateProduct from './page/Admin/CreateProduct';
import { Toaster } from 'react-hot-toast';
import Login from './page/Login';
import AdminLayout from './components/Layouts/Admin.Layout';
import AdminHome from './page/Admin/Admin.Home';
import AdminAllUsers from './page/Admin/Admin.AllUsers';
import UserProfile from './page/User/UserProfile';
import Orders from './page/Admin/Admin.Orders';
import MyOrders from './page/User/MyOrders';
import ScrollTop from "./util/ScrollTop_Onload";
import OrderDetails from './page/User/OrderDetails';

const queryClient = new QueryClient()
function App() {

 
  const router = createBrowserRouter([
    { path: "/", element: (<Layout>   <Home /> </Layout>) },
    { path: '/products/:id', element: (<Layout> <Product /> </Layout>) },
    { path: '/signup', element: <SignUp /> },
    { path: '/login', element: <Login /> },
    { path: '/profile/:id', element: <UserProfile /> },
    {
      path: "/admin", element: <AdminLayout />,
      children: [
        { path: 'home', element: <AdminHome /> },
        { path: 'create-product', element: <CreateProduct /> },
        { path: 'allusers', element: <AdminAllUsers /> },
        { path: 'orders', element: <Orders /> }
      ]
    },
    { path: '/myorders', element: (<Layout> <MyOrders /> </Layout>) },
    { path: '/order-detail/:id', element: (<Layout> <OrderDetails /> </Layout>) },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>

  )
}

export default App

