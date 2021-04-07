import React ,{createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const AuthContext = createContext({signed: true});//

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageDate() {
            const storageUser = await AsyncStorage.getItem('@GiulenAuth:user');
            const storageToken = await AsyncStorage.getItem('@GiulenAuth:token');

            if(storageToken && storageUser){
                api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
        }

        loadStorageDate();
    }, [])

    async function signIn(userForm) {
        const response = await api.post('/auth/authenticate', userForm);
        
        const token = response.data.token;
        const user = response.data.user;

        setUser(user);

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem('@GiulenAuth:user', JSON.stringify(user));
        await AsyncStorage.setItem('@GiulenAuth:token', token);   
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}