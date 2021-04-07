import React, {useState} from 'react';
import {View, Button, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {MaterialIcons} from "@expo/vector-icons"
import {useAuth} from '../../contexts/auth';

import logo from '../../assets/logo.png'

const SignIn = () => {
    const {signIn} = useAuth();
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    function handleSignIn() {
        const user = {
            username: name,
            password,
        }
        signIn(user);
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#999"
                placeholder="Digite o seu nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#999"
                placeholder="Digite a senha de acesso"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
                <MaterialIcons name="login" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    logo: {
        width: '95%',
        resizeMode: 'contain'
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 10,
        marginHorizontal: 15,
        paddingHorizontal: 10
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#00ffc8',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },

    buttonText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 5
    }
})

export default SignIn;