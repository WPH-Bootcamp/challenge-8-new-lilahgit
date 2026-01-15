import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position='top-center'
          offset={114}
          toastOptions={{
            className:
              'h-[52px] w-[531px] justify-center rounded-full bg-white/25 px-[150px] py-2 text-center text-sm text-white backdrop-blur-[40px] [&_svg]:h-5 [&_svg]:w-5',
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
