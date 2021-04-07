import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useAuth} from '../../contexts/auth';
import {MaterialIcons} from "@expo/vector-icons"

import api from '../../services/api';

const Menseger = () => {
    const {user} = useAuth();
    const [menseger, setMenseger] = useState();
    const [posts, setPosts] = useState([]);
    const [floatMensegerId, setFloatMensegerId] = useState(''); 

    useEffect(() => {
        registerToSocket();

        async function LoadMensegers() {
            const response = await api.get('/menseger');
            const postsData = response.data;
            setPosts(postsData);
        }

        LoadMensegers();
    }, [posts])

    function registerToSocket() {
        const socket = io('https://api-giulen.herokuapp.com:443');
        
        socket.on('msg', newPost => {
            setPosts([newPost, ...posts]);
        })
    }

    async function handleSendMenseger() {
        await api.post('/menseger', {
            menseger,
        })
        setMenseger('');
    }

    async function handleDeleteMenseger() {
        await api.delete(`/menseger/${floatMensegerId}/${user._id}`)

        setFloatMensegerId('')
    }

    const renderItem = ({item}) => {
        return (
            <View>
                {item.user == user._id &&
                    <View key={item._id} style={styles.mensegerSend}>
                        <Text style={styles.textMenseger}>{item.menseger}</Text>
                        <TouchableOpacity onPress={() => {setFloatMensegerId(item._id)}}>
                            <MaterialIcons name="more-vert" size={20} color="#fff"/>
                        </TouchableOpacity>  
                    </View>
                }
                {item.user != user._id &&
                    <View key={item._id} style={styles.mensegerReceived}>
                        <Text key={item._id}>{item.menseger}</Text>  
                    </View>
                }
            </View>           
        )
    }

    return (
        <View style={styles.container}>
            {floatMensegerId == '' &&
                <>
                    <SafeAreaView style={styles.container} style={{height: '88%'}}>
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 15}}
                            snapToEnd={true}
                            style={styles.containerPosts} data={posts} renderItem={renderItem} keyExtractor={item => item._id}
                        />
                    </SafeAreaView>
                
                    <View style={styles.mensegerForm}>
                        <TextInput 
                            placeholderTextColor="#999"
                            placeholder="Digite algo..."
                            value={menseger}
                            onChangeText={setMenseger}
                            style={styles.inputMenseger}
                            multiline={true}
                        />
                        <TouchableOpacity onPress={handleSendMenseger} style={styles.buttonMenseger}>
                            <MaterialIcons name="send" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </>
            }
            {floatMensegerId != '' && 
                <View style={styles.containerFloat}>
                <TouchableOpacity onPress={() => {setFloatMensegerId('')}} style={styles.floatButtonExit}>
                    <MaterialIcons name="close" size={40} color="#fff"/>
                </TouchableOpacity>

                <View style={styles.floatButtonDeleteArea}>
                    <TouchableOpacity onPress={handleDeleteMenseger} style={styles.floatButtonDelete}>
                        <Text style={styles.TextFloat}>Apagar mensagem</Text>
                        <MaterialIcons name="delete" size={35} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    floatText: {
        backgroundColor: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    container: {
        flex: 1
    },

    containerPosts: {
        padding: 15,
    },

    buttonFloat: {
        backgroundColor: 'gray',
    },

    mensegerReceived: {
        width: '85%',
        backgroundColor: '#fff',
        marginTop: 8,
        borderRadius: 20,
        borderTopLeftRadius: 0,
        padding: 7
    },

    mensegerSend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        width: '85%',
        backgroundColor: '#ccc',
        marginTop: 8,
        borderRadius: 20,
        borderTopRightRadius: 0,
        padding: 7
    },

    textMenseger: {
        flex: 0.95
    },

    mensegerForm: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10
    },

    inputMenseger: {
        flex: 0.8,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonMenseger: {
        flex: 0.15,
        backgroundColor: '#EE82EE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    containerFloat: {
        flex: 1,
        backgroundColor: '#000'
    },

    floatButtonExit: {
        flex: 0.1,
        alignSelf: 'flex-end',
        margin: 10
    },

    floatButtonDeleteArea: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    floatButtonDelete: {
        flexDirection: 'row',
        backgroundColor: "#EE82EE",
        padding: 10,
        borderRadius: 5
    },

    TextFloat: {
        color: "#fff",
        fontSize: 25
    }
})

export default Menseger;