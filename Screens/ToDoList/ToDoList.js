import { useState } from 'react';
import { View, Text, Image, Pressable, Modal, TextInput, StyleSheet, ScrollView } from 'react-native';
import DeleteModal from "../../Components/Modal/DeleteModal/DeleteModal";
import AddModal from "../../Components/Modal/AddModal/AddModal";



export default function ToDoList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalForDelete, setModalForDelete] = useState(false);
  const [modalForAdd, setModalForAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [data, setData] = useState([
    {
      "id": 0,
      "content": "Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night ",
      "isDone": false
    },
    {
      "id": 1,
      "content": "wake up at 6 o'clock everyday  Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night ",
      "isDone": false
    },
    {
      "id": 2,
      "content": "Make breakfast  Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night ",
      "isDone": false
    },
    {
      "id": 3,
      "content": "Head to the gym  Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night ",
      "isDone": false
    },
    {
      "id": 4,
      "content": "Start working at 10AM  Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night ",
      "isDone": false
    },
    {
      "id": 5,
      "content": "Take lunch @2PM Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night ",
      "isDone": false
    },
    {
      "id": 6,
      "content": "Take dinner @8PM  Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night Go to bed at 10PM at night ",
      "isDone": false
    },
  ])

  function onSelectItem(getId) {
    if (selectedItemId !== null && getId === selectedItemId) {
      setSelectedItemId(null);
      setSelectedItem(null);
    } else {
      setSelectedItemId(getId);
      setSelectedItem(data.findIndex(item => item.id === getId));
    }
  }

  function markAsDone() {
    setData(data.map(obj => (obj.id === selectedItemId) ? { ...obj, isDone: true } : obj))
  }
  function markAsUnDone() {
    setData(data.map(obj => (obj.id === selectedItemId) ? { ...obj, isDone: false } : obj))
  }

  function deleteTodoWarning() {
    setModalVisible(true);
    setModalForDelete(true);
  }

  function openAddTodo() {
    setModalVisible(true);
    setModalForAdd(true);
  }

  function addTodo(content) {
    const random = Math.floor(Math.random() * 9999) + 1000;
    const newData = {
      "id": random,
      "content": content,
      "isDone": false
    }
    setData([newData, ...data])
    console.log(newData);
    closeModal();
  }

  function deleteTodo() {
    setData(
      data.filter(a =>
        a.id !== selectedItemId
      )
    );
    closeModal();
  }
  function closeModal() {
    setModalVisible(false);
    setModalForDelete(false);
    setModalForAdd(false);
    setSelectedItemId(null);
    setSelectedItem(null);
  }

  return (
    <>
      <View style={styles.wrapperContainer}>
        <View style={styles.topActionBar}>
          <View style={styles.logoArea}>
            <Image style={styles.logoImage} source={require('../../assets/icon.png')} />
            <Text style={styles.logoText}>ToDo</Text>
          </View>
          <View style={styles.topActionBarButtonWrap}>
            {
              (selectedItem !== null) ?
                <>
                  {
                    (!data[selectedItem].isDone) ?
                      <Pressable style={styles.addItemButton} onPress={markAsDone}>
                        <Image style={styles.addItemButtonIcon} source={require('../../assets/tick.png')} />
                      </Pressable>
                      :
                      <Pressable style={styles.addItemButton} onPress={markAsUnDone}>
                        <Image style={styles.addItemButtonIcon} source={require('../../assets/closeIcon.png')} />
                      </Pressable>
                  }
                  <Pressable style={styles.addItemButton} onPress={deleteTodoWarning}>
                    <Image style={styles.addItemButtonIcon} source={require('../../assets/deleteIcon.png')} />
                  </Pressable>
                </>
                :
                <Pressable style={styles.addItemButton} onPress={openAddTodo}>
                  <Image style={styles.addItemButtonIcon} source={require('../../assets/addIcon.png')} />
                </Pressable>
            }

          </View>
        </View>
        <View style={styles.toDoListArea}>
          <ScrollView style={styles.ToDoScrollView} alwaysBounceVertical={false}>
            {
              data.map((item) =>
                <Pressable key={item.id} onPress={() => onSelectItem(item.id)} style={styles.toDoListItem}>
                  {
                    (selectedItemId == item.id)
                      ? <View style={[styles.toDoItemSelect, styles.toDoItemSelected]}></View>
                      : <View style={styles.toDoItemSelect}></View>
                  }
                  {
                    (item.isDone)
                      ?
                      <Text style={[styles.toDoItemText, styles.toDoItemTextDone]}>
                        {item.content}
                      </Text>
                      :
                      <Text style={styles.toDoItemText}>
                        {item.content}
                      </Text>
                  }

                </Pressable>
              )
            }
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {modalForAdd && <AddModal onAccept={addTodo} onReject={closeModal}></AddModal>}
        {modalForDelete && <DeleteModal onAccept={deleteTodo} onReject={closeModal}></DeleteModal>}
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    width: '100%',
    marginTop: 60,
  },
  topActionBar: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingBottom: 12,
    paddingHorizontal: 24,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: "center",
  },
  logoImage: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginRight: 10,
  },
  logoText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 24,
  },
  topActionBarButtonWrap: {
    flexDirection: "row",
  },
  addItemButton: {
    width: 32,
    height: 32,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    // shadow for andorid
    elevation: 6,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  addItemButtonIcon: {
    width: 16,
    height: 16,
  },
  toDoListArea: {
    flex: 1,
    marginTop: 8,
  },
  ToDoScrollView: {
    borderBottomColor: "red",
    // marginBottom: 24,
    marginTop: 10,
  },
  toDoListItem: {
    backgroundColor: "#fff",
    marginBottom: 14,
    marginTop: 2,
    marginHorizontal: 24,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
    // shadow for andorid
    elevation: 6,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  toDoItemSelect: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    marginRight: 12,
  },
  toDoItemSelected: {
    backgroundColor: "#000"
  },
  toDoItemText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
    width: "90%",
    margin: "auto"
  },
  toDoItemTextDone: {
    textDecorationColor: "#000",
    textDecorationLine: "line-through"
  }
});