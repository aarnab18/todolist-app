import { TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RemoveTask({ taskList, setTaskList, index }) {
  const eventHandler = async () => {
     // Filter out the task that needs to be deleted
    const newTaskList = taskList.filter((_, taskIndex) => taskIndex !== index);
    // Update task list
    setTaskList(newTaskList);
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(newTaskList));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={eventHandler}>
      <Text style={styles.iconText}>🗑️</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center', 
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FF5733',
    marginLeft: 20,
  },
  iconText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
