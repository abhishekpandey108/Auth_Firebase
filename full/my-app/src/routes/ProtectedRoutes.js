import {useSelector} from  'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export default function ProtectedRoute(){
    const location = useLocation();
    const user = useSelector(state => state.user);
    return user.user ? <Outlet/> : <Navigate to ='/login' state = {{from:location}} replace />
}