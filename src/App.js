import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './contexts/auth';

import Routes from './routes/index.js';

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </NavigationContainer>
    )
}

export default App;