import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VetbookScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Digital Vet Book</Text>
                <Text style={styles.subtitle}>Select a pet from the home dashboard to view their records and timeline.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
    card: {
        backgroundColor: '#c0a3e5',
        borderWidth: 3,
        borderColor: '#000',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        alignItems: 'center'
    },
    title: { fontSize: 24, fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: 12 },
    subtitle: { fontSize: 16, fontWeight: '700', color: '#000', textAlign: 'center' }
});
