import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface smallTextProps {
    displayText: string;
    description?: string;
    example?: string;
}

const questions = {
    0: {
        active: true,
        answerType: 'smallText',
        description: 'Your name as written on legal documents',
        displayText: 'Name',
        example: 'ex. Noah Alexander Hernandex',
        key: 'Name',
        order: 0,
        questionType: 'Intake'
    },
    1: {
        active: true,
        answerType: 'smallText',
        description: 'If you do not have an email, put N/A.',
        displayText: 'Email Address',
        example: 'ex. example@example.com',
        key: 'Email',
        order: 1,
        questionType: 'Intake'
    },
    2: {
        active: true,
        answerType: 'smallText',
        displayText: 'Telephone',
        example: 'ex. 000-000-0000',
        key: 'Telephone',
        order: 2,
        questionType: 'Intake'
    }
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

/*
function renderSmallText(props: smallTextProps) {
    return (
        <div>
            <Text>{props.displayText}</Text>
            <Text>{props.description}</Text>
            <TextInput placeholder={props.example} />
        </div>
    )
}
*/




function renderSmallText() {
    return (
        <View style={styles.container}>
            <Text style={styles.displayText}>Name</Text>
            <Text style={styles.description}>Your name as written on legal documents.</Text>
            <TextInput style={styles.example} placeholder='ex. Noah Alexander Hernandez' />
        </View>
    )
}

export default renderSmallText