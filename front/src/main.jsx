import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './index.css'

import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

import HomeScreen from './screen/HomeScreen.jsx'
import ProductScreen from './screen/ProductScreen.jsx'
import CartScreen from './screen/CartScreen.jsx'
import LoginScreen from './screen/LoginScreen.jsx'
import RegisterScreen from './screen/RegisterScreen.jsx'
import ShippingScreen from './screen/ShippingScreen.jsx'
import PaymentScreen from './screen/PaymentScreen.jsx'
import PlaceOrderScreen from './screen/PlaceOrderScreen.jsx'
import OrderScreen from './screen/OrderScreen.jsx'
import ProfileScreen from './screen/ProfileScreen.jsx'

import OrderListScreen from './screen/admin/OrderListScreen.jsx'
import ProductListScreen from './screen/admin/ProductListScreen.jsx'
import ProductEditScreen from './screen/admin/ProductEditScreen.jsx'

import UserListScreen from './screen/admin/UserListScreen.jsx'
import UserEditScreen from './screen/admin/UserEditScreen.jsx'

// redux
import { Provider } from 'react-redux'
import store from './store.js'
import {PayPalScriptProvider} from '@paypal/react-paypal-js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/search/:keyword' element={<HomeScreen/>}/>
      <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>  
        <Route path='/orders/:id' element={<OrderScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>    
      </Route>

      <Route path='' element={<AdminRoute/>}>
        
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/productslist' element={<ProductListScreen/>}/>
        <Route path='/admin/productslist/:pageNumber' element={<ProductListScreen/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>

        <Route path='/admin/userlist' element={<UserListScreen/>}/>
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={false}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)
