//importar las pages
import { Route, Routes } from 'react-router-dom';
import { Login } from '../Components/pages/Login'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
        </Routes>    
    )
}

export default AppRoutes;