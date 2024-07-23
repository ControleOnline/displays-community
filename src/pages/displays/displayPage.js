import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { fetchDisplayType, fetchQueuesForDisplay } from '../../services/displayService';
import { fetchOrdersForQueue, updateOrderStatus } from '../../services/orderService';
import globalStyles from '../../styles/global';

const DisplayPage = ({ route }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayType, setDisplayType] = useState('');
    const displayId = route.params.displayId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const type = await fetchDisplayType(displayId);
                setDisplayType(type);

                const queues = await fetchQueuesForDisplay(displayId);

                const allOrders = [];
                for (const queue of queues) {
                    const ordersForQueue = await fetchOrdersForQueue(queue.id);
                    allOrders.push(...ordersForQueue);
                }

                setOrders(allOrders);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [displayId]);

    const handleOrderStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
        }
    };

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {displayType === 'view' ? 'Pedidos Disponíveis para Retirada' : 'Pedidos em Preparação'}
            </Text>
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>Pedido: #{item.id}</Text>
                        <Text style={styles.orderText}>Status: {item.status}</Text>
                        {/* <Text style={styles.orderText}>Cliente: {item.customerName}</Text> */}
                        {displayType === 'production' && (
                            <View style={styles.buttonContainer}>
                                {item.status === 'Aguardando' && (
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handleOrderStatusChange(item.id, 'Em preparação')}
                                    >
                                        <Text style={styles.buttonText}>Iniciar Preparação</Text>
                                    </TouchableOpacity>
                                )}
                                {item.status === 'Em preparação' && (
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handleOrderStatusChange(item.id, 'Finalizado')}
                                    >
                                        <Text style={styles.buttonText}>Finalizar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DisplayPage;
