import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './styles/global.css';


import App from './App.jsx'
import Home from './pages/Home';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipe from './pages/Recipe';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      // errorElement: <NoMatch />,
      children: [
        {
          index: true,
          element: <Home />
        }, {
          path: '/login',
          element: <Login />
        }, {
          path: '/signup',
          element: <Signup />
        }, {
          path: '/profile',
          element: <Profile />
          },{
          path: '/recipes/:id',
          element: <Recipe />
        }, {
          path: '/post',
          element: <Post />
        }
      ]
    }
  ])
  
  ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
  )
  