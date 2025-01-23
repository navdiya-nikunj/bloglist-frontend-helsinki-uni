import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store/store'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout'
import Users from './components/Views/Users'
import User from './components/Views/User'
import BlogView from './components/Views/BlogView'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="users" element={<Users />} />
                    <Route path="user/:userId" element={<User />} />
                    <Route path="blogs/:blogId" element={<BlogView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)
