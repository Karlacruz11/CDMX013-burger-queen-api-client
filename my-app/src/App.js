import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginView from './components/Login/LoginView'
import Partners from './components/Admin/Partners'
import Products from './components/Admin/Products'
import WaitersLayout from './components/Waiters/WaitersLayout'
import getData from './getData'
import Kitchen from './components/Kitchen/Kitchen'
import PreparedContainer from './components/Kitchen/PreparedContainer'
import OrdersReady from './components/Waiters/OrdersReady'

    const urlUsers = 'https://6372d80a348e947299fdd17b.mockapi.io/users'
    const urlProducts = 'https://6372d80a348e947299fdd17b.mockapi.io/products'
    const urlOrders = "https://6372d80a348e947299fdd17b.mockapi.io/orders";

export default function App() {
    const [user,setUser]=useState(null)

    const handleAccount=(userAuth)=>{
        setUser(userAuth)
    }

    const routerNoAuth = createBrowserRouter([
 
        {
            path: '/',
            element: <LoginView handleAccount={handleAccount} />,
            loader: ({ request, params }) => {
                return getData(urlUsers)
            },
        }])
    
    const routerAuth = createBrowserRouter([
 
        {
            path: '/',
            element: <LoginView handleAccount={handleAccount} />,
            loader: ({ request, params }) => {
                return getData(urlUsers)
            },
        },
        {
            path: '/admin/partners',
            element: <Partners />,
            loader: ({ request, params }) => {
                return getData(urlUsers)
            }
        },
        {
            path: '/admin/products',
            element: <Products />,
            loader: ({ request, params }) => {
                return getData(urlProducts)
            },
        },
        {
            path: '/waiters/new_order',
            element: <WaitersLayout />,
            loader: ({ request, params }) => {
                return getData(urlProducts)
            },
        },
        {
            path: '/waiters/ready',
            element: <OrdersReady />,
            loader: ({ request, params }) => {
                return getData(urlOrders)
            },
        },
        {
            path: '/kitchen/active',
            element: <Kitchen />,
            loader: ({ request, params}) =>{
                return getData(urlOrders)
            }
        },
        {
            path: '/kitchen/prepared',
            element: <PreparedContainer />,
            loader: ({ request, params}) =>{
                return getData(urlOrders)
            }
        },
    ])
    
    

  return (
         <>
         {user?<RouterProvider router={routerAuth} />:<RouterProvider router={routerNoAuth} />}
         </>
  )
}
