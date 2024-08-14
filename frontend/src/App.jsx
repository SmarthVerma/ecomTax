import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from 'react-hot-toast';
import { router } from './AppRouter';
import { useDispatch } from 'react-redux';
import { useGetUserDetails } from './hooks/general/useGetUserDetails';

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();

  // Assuming useGetUserDetails fetches and dispatches user details
   

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;