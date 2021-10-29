import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 24
    },
    displayText: {
        width: '74%',
        height: 17,
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '600',
        color: '#2B2B2B',
        marginBottom: 8
    },
    calendar: {
        width: '74%',
        borderWidth: 1,
        borderColor: '#2B2B2B',
        borderRadius: 8
    }
});

function renderCalendar() {
    const [date] = useState(new Date(1598051730000));

    return (
        <View style={styles.container}>
            <Text style={styles.displayText}>Data of Birth</Text>
            <DateTimePicker
                style={styles.calendar}
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
            />
        </View>
    );
};

export default renderCalendar;