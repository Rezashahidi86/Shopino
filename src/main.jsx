import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import routes from './lib/routes.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router'
import "./../public/css/index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
