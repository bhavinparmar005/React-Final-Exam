
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Provider } from 'react-redux'
import {Store} from "../Store.jsx"


createRoot(document.getElementById('root')).render(
   <Provider store={Store}>
      <App />

   </Provider>


)
