import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from 'react-hot-toast';
import { router } from './AppRouter';
import FetchAndStore from './components/FetchAndStore';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <FetchAndStore>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </FetchAndStore>

    </QueryClientProvider>
  );
}

export default App;