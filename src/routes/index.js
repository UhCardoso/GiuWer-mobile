import React from 'react';
import {View} from 'react-native';

import {useAuth} from '../contexts/auth'; 

import AppRoutes from './app.routes.js';
import AuthRoutes from './auth.routes.js';

const Routes = () => {
    const {signed, loading} = useAuth();
    
    if(signed)
        return <AppRoutes/>

    if(!signed)
        return <AuthRoutes/>
}

export default Routes;