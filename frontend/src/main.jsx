import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store_temp.js'
import './index.css'
import App from './App.jsx'
import AppProvider from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>          {/* ← Redux Provider wrap */}
      <AppProvider>                    {/* ← Context Provider */}
        <App />
      </AppProvider>
    </Provider>
  </StrictMode>,
)