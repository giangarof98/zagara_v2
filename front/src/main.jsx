import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './index.css'

import PrivateRoute from './components/PrivateRoute.jsx'

import HomeScreen from './screen/HomeScreen.jsx'
import ProductScreen from './screen/ProductScreen.jsx'
import CartScreen from './screen/CartScreen.jsx'
import LoginScreen from './screen/LoginScreen.jsx'
import RegisterScreen from './screen/RegisterScreen.jsx'
import ShippingScreen from './screen/ShippingScreen.jsx'
import PaymentScreen from './screen/PaymentScreen.jsx'
import PlaceOrderScreen from './screen/PlaceOrderScreen.jsx'
import OrderScreen from './screen/OrderScreen.jsx'

// redux
import { Provider } from 'react-redux'
import store from './store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>  
        <Route path='/orders/:id' element={<OrderScreen/>}/>  
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
