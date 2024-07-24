// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import RadioGroup from 'react-native-radio-buttons-group';

// const DisplayForm = ({ navigation }) => {
//     const [name, setName] = useState('');
//     const [entryStatus, setEntryStatus] = useState('');
//     const [exitStatus, setExitStatus] = useState('');
//     const [displayType, setDisplayType] = useState('client');

//     const handleSave = async () => {
//         if (!name || !entryStatus || !exitStatus) {
//             Alert.alert('Erro', 'Todos os campos são obrigatórios!');
//             return;
//         }

//         const displayData = {
//             name,
//             entryStatus,
//             exitStatus,
//             displayType,
//         };

//         /*
//         try {
//           const response = await api.post('/displays', displayData);
//           if (response.ok) {
//             Alert.alert('Sucesso', 'Display salvo com sucesso!');
//             navigation.goBack();
//           } else {
//             Alert.alert('Erro', 'Erro ao salvar display!');
//           }
//         } catch (error) {
//           console.error('Erro ao salvar display:', error);
//           Alert.alert('Erro', 'Erro ao salvar display!');
//         }
//         */

//         // Dados dummy para demonstração
//         console.log(displayData);
//         Alert.alert('Sucesso', 'Display salvo com sucesso! (Dados Dummy)');
//         navigation.goBack();
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Cadastro de Display</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nome do Display"
//                 value={name}
//                 onChangeText={setName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Status de Entrada"
//                 value={entryStatus}
//                 onChangeText={setEntryStatus}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Status de Saída"
//                 value={exitStatus}
//                 onChangeText={setExitStatus}
//             />
//             <Text style={styles.label}>Tipo de Display:</Text>
//             <RadioGroup
//                 radioButtons={[
//                     { label: 'Cliente', value: 'client', selected: displayType === 'client' },
//                     { label: 'Funcionário', value: 'staff', selected: displayType === 'staff' }
//                 ]}
//                 onPress={radioButtons => {
//                     const selectedButton = radioButtons.find(r => r.selected);
//                     setDisplayType(selectedButton ? selectedButton.value : 'client');
//                 }}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleSave}>
//                 <Text style={styles.buttonText}>Salvar</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#d71a1a',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     input: {
//         borderColor: '#d71a1a',
//         borderWidth: 1,
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 18,
//         color: '#d71a1a',
//         marginBottom: 10,
//     },
//     button: {
//         backgroundColor: '#d71a1a',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });

// export default DisplayForm;
