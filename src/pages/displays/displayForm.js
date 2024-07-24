import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import globalStyles from '../../styles/global';

const DisplayForm = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('');
    const [displayType, setDisplayType] = useState(''); 
    const [status, setStatus] = useState('Aguardando'); 

    const testSave = () => {
        const newDisplay = {
            name: displayName,
            type: displayType,
            status: status,
        };
        console.log('Display cadastrado:', newDisplay);
        navigation.navigate('DisplaysPage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Display</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Display"
                value={displayName}
                onChangeText={setDisplayName}
            />
            <Picker
                selectedValue={displayType}
                style={styles.input}
                onValueChange={(itemValue) => setDisplayType(itemValue)}
            >
                <Picker.Item label="Selecione o Tipo de Display" value="" />
                <Picker.Item label="Exibição" value="view" />
                <Picker.Item label="Produção" value="production" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={testSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DA291C', 
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#DA291C', 
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default DisplayForm;
