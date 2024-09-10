import { createBrowserRouter } from 'react-router-dom';
import InitialLayout from '../layouts/initialLayout';
import UrlShortenerForm from '../pages/UrlShortenerForm';
import UrlRedirector from '../pages/UrlRedirector';
import ErrorPage from '../pages/ErrorPage';


export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <InitialLayout />,
    children: [
      { path: '/shorten', element: <UrlShortenerForm /> },
      { path: '/original_url', element: <UrlRedirector /> },  
    ]
  }
]);
