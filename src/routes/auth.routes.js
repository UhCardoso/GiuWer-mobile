import React from 'react';
import SignIn from '../pages/Signin';

import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name={"Signin"} component={SignIn} options={{
            title: "Logar",
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00ffc8'
            }
        }}/>
    </AuthStack.Navigator>
)

export default AuthRoutes;