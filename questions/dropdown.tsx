import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 24,
        zIndex: 1000
    },
    displayText: {
        width: '74%',
        height: 17,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        color: '#2B2B2B',
        marginBottom: 8
    }
});

function renderDropbox() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'Vietnamese', value: 'vietnamese' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.displayText}>Language preference</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={{
                    width: '74%',
                    height: 50,
                    borderColor: '#2B2B2B',
                    borderRadius: 8
                }}
                labelStyle={{
                    color: '#2B2B2B'
                }}
                textStyle={{
                    fontSize: 14,
                    lineHeight: 17
                }}
            />
        </View>
    );
}

export default renderDropbox;