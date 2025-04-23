
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { Provider } from 'react-redux'
import { store } from "../Store.jsx"


createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <App />
   </Provider>


)
