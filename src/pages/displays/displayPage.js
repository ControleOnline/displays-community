import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import globalStyles from '../../styles/global';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDisplayType } from '../../store/slices/displaySlice';
// import { fetchOrdersForQueue, updateOrderStatus } from '../../services/orderService';

const DisplayPage = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [displayType, setDisplayType] = useState('');
    // const dispatch = useDispatch();
    // const displayType = useSelector((state) => state.display.displayType);
    // const displayId = route.params.displayId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // dispatch(fetchDisplayType(displayId)); 
                // const type = await fetchDisplayType(displayId);
                // setDisplayType(type);

                const dummyDisplayType = 'production';
                setDisplayType(dummyDisplayType);

                const dummyOrders = [
                    { id: 1, status: 'Aguardando', customerName: 'Cliente 1', items: ['Sanduíche', 'Batata', 'Observação: Sem cebola'] },
                    { id: 2, status: 'Em preparação', customerName: 'Cliente 2', items: ['Pizza', 'Refrigerante', 'Observação: Extra queijo'] },
                    { id: 3, status: 'Finalizado', customerName: 'Cliente 3', items: ['Salada', 'Suco', 'Observação: Sem tomate'] }
                ];

                setOrders(dummyOrders);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOrderStatusChange = async (orderId, newStatus) => {
        try {
            // await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
        }
    };

    const renderOrderDetails = (order) => {
        return (
            <ScrollView contentContainerStyle={styles.orderDetails}>
                <Text style={styles.detailsTitle}>Detalhes do Pedido #{order.id}</Text>
                <Text style={styles.detailsText}>Cliente: {order.customerName}</Text>
                <Text style={styles.detailsText}>Status: {order.status}</Text>
                <Text style={styles.detailsText}>Itens:</Text>
                {order.items.map((item, index) => (
                    <Text key={index} style={styles.detailsItem}>{item}</Text>
                ))}
                {displayType === 'production' && (
                    <View style={styles.buttonContainer}>
                        {order.status === 'Aguardando' && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleOrderStatusChange(order.id, 'Em preparação')}
                            >
                                <Text style={styles.buttonText}>Iniciar Preparação</Text>
                            </TouchableOpacity>
                        )}
                        {order.status === 'Em preparação' && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleOrderStatusChange(order.id, 'Finalizado')}
                            >
                                <Text style={styles.buttonText}>Finalizar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </ScrollView>
        );
    };

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.orderListContainer}>
                <Text style={styles.title}>
                    {displayType === 'view' ? 'Pedidos Disponíveis para Retirada' : 'Pedidos em Preparação'}
                </Text>
                <FlatList
                    data={orders}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.orderItem} onPress={() => displayType === 'production' ? setSelectedOrder(item) : null}>
                            <Text style={styles.orderText}>Pedido: #{item.id}</Text>
                            <Text style={styles.orderText}>Status: {item.status}</Text>
                            <Text style={styles.orderText}>Cliente: {item.customerName}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            {displayType === 'production' && (
                <View style={styles.orderDetailsContainer}>
                    {selectedOrder ? renderOrderDetails(selectedOrder) : <Text style={styles.detailsPlaceholder}>Selecione um pedido para ver os detalhes</Text>}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    orderListContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DA291C',
        marginBottom: 20,
    },
    orderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
    },
    orderText: {
        fontSize: 16,
        color: '#333',
    },
    orderDetailsContainer: {
        flex: 2,
        padding: 20,
        backgroundColor: '#e6e6e6',
    },
    orderDetails: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        flexGrow: 1,
    },
    detailsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 18,
        marginBottom: 5,
    },
    detailsItem: {
        fontSize: 16,
        marginLeft: 10,
    },
    detailsPlaceholder: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#DA291C',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DisplayPage;
