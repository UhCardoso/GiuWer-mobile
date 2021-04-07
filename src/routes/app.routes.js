import React from 'react';
import {Image} from 'react-native';
import Menseger from '../pages/Menseger';
import {MaterialIcons} from "@expo/vector-icons"

import {useAuth} from '../contexts/auth';

import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

function LogoTitle() {
    return(
        <Image
            style={{width: 100, height: 30}}
            source={require('../assets/logo2.png')}
        />
    )
}

const AppRoutes = () => {
    const {signOut} = useAuth();

    return (
        <AppStack.Navigator>
            <AppStack.Screen name={"Menseger"} component={Menseger} options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: "#00ffc8"
                },
                headerRight: () => (
                    <MaterialIcons
                        name="logout"
                        size={20}
                        color="#fff"
                        style={{marginRight: 15}}
                        onPress={signOut}
                    />
                ) 
            }}/>

        </AppStack.Navigator>
    )
}

export default AppRoutes;