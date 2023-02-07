import { useState } from 'react';
import { View, Text, Image, Pressable, Modal, TextInput, StyleSheet } from 'react-native';

export default function AddModal(props) {
    const [newTodo, setNewTodo] = useState('');
    function onAdd() {
        props.onAccept(newTodo);
        setNewTodo('');
    }
    function onClose() {
        props.onReject();
        setNewTodo('');
    }
    return (
        <View style={styles.modalWraper}>
            <View style={styles.modalContent}>
                <View style={styles.closeItemButtonWrap}>
                    <Pressable onPress={onClose}>
                        <View style={styles.closeItemButton}>
                            <Image style={styles.addItemButtonIcon} source={require('../../../assets/closeIcon.png')} />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.modalContentWrap}>
                    <Text style={styles.modalHeadingText}>Write what you want to do!</Text>
                    <TextInput
                        editable
                        multiline
                        style={styles.inputField}
                        onChangeText={(text) => setNewTodo(text)}
                        placeholder="Type here"
                        value={newTodo}
                        autoCorrect={false}
                        autoFocus={true}
                    />
                    <Pressable onPress={onAdd}>
                        <View style={styles.modalActionButtonWrap}>
                            <Text style={styles.modalActionButtonText}>Add</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalWraper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: "center",
        alignItems: "center",
    },
    modalContentWrap: {
        alignItems: 'center',
    },
    modalContent: {
        maxWidth: '90%',
        width: "100%",
        padding: 24,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    closeItemButtonWrap: {
        width: "auto",
        alignItems: 'flex-end',
    },
    closeItemButton: {
        alignSelf: 'flex-end',
        width: 32,
        height: 32,
        marginBottom: 24,
        backgroundColor: "#fff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        // shadow for andorid
        elevation: 10,
        // shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
    },
    modalHeadingText: {
        fontFamily: 'Lexend-Regular',
        fontSize: 16,
        lineHeight: 20,
        alignSelf: 'flex-start'
    },
    modalActionButtonWrap: {
        marginTop: 24,
        paddingHorizontal: 29,
        paddingVertical: 8,
        backgroundColor: "#000",
        borderRadius: 10,
    },
    modalActionButtonText: {
        color: "#fff",
        fontFamily: 'Lexend-Bold',
        fontSize: 16,
    },
    inputField: {
        // maxWidth
        width: "100%",
        fontFamily: 'Lexend-Regular',
        fontSize: 16,
        backgroundColor: "#fff",
        marginTop: 16,
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: "flex-start",

        // shadow for andorid
        elevation: 10,
        // shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
    }
});