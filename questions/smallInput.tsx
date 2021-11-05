import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface smallInputProps {
    displayText: string;
    description?: string;
    example?: string;
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 24
    },
    displayText: {
        width: '74%',
        height: 17,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        color: '#2B2B2B',
        marginBottom: 8
    },
    description: {
        width: '74%',
        height: 17,
        fontSize: 14,
        lineHeight: 17,
        color: '#6A6A6A',
        marginBottom: 8
    },
    example: {
        width: '74%',
        height: '4.46%',
        fontSize: 12,
        lineHeight: 14,
        color: '#6A6A6A',
        borderWidth: 1,
        borderColor: '#2B2B2B',
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
    }
});

const SmallInput = (props: smallInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.displayText}>Name</Text>
            <Text style={styles.description}>Your name as written on legal documents.</Text>
            <TextInput style={styles.example} placeholder='ex. Noah Alexander Hernandez' />
        </View>
    )
}

export default SmallInput;