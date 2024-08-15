import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from 'react-hot-toast';
import { router } from './AppRouter';
import { AuthContextProvider } from '@/context/AuthContext';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;