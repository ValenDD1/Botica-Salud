//importar las pages
import { Route, Routes } from 'react-router-dom';

import MainLayout from './mainLayout'

import { InventoryTable } from '../Components/organism/Tables/Inventory';
import { UserTable } from '../Components/organism/Tables/Users';
import { Login } from '../Components/pages/Login'
import { History } from '../Components/pages/History';
import { ClientServices } from '../Components/pages/clientservices';
import { Sales } from '../Components/pages/Sales';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route element={<MainLayout/>} >
                <Route path='/inventario' element={<InventoryTable/>} />
                <Route path='/usuarios' element={<UserTable/>} />
                <Route path='/ventas' element={<Sales/>} />
                <Route path='/historial' element={<History/>} />
                <Route path='/servicios' element={<ClientServices/>} />
            </Route>
        </Routes>    
    )
}

export default AppRoutes;