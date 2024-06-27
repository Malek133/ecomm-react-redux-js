import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter as Router} from 'react-router-dom'
import {
  QueryClient,QueryClientProvider
} from  '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <Router>
   <ChakraProvider>
    <App />
  </ChakraProvider> 
  </Router>
  </QueryClientProvider>

  
    
  
)
