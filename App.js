import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from "./components/Task.js";
import AddTask from "./components/AddTask.js";
import RemoveTask from "./components/RemoveTask.js";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const data = await AsyncStorage.getItem('taskList');
      if (data != null) {
        setTaskList(JSON.parse(data));
      }
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Exercise 3: Move a completed task to the bottom of the list
  const handlePressEvent = async (index) => {
    let newTaskList = [...taskList];
    newTaskList[index].complete = !newTaskList[index].complete;
    const task = newTaskList[index];
    newTaskList = newTaskList.filter((_, i) => i !== index);
    // If the task is complete, move it to the bottom
    // Else, move it to the top
    task.complete ? newTaskList.push(task) : newTaskList.unshift(task);
    setTaskList(newTaskList);
    
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(newTaskList));
    } catch (error) {
      console.log(error);
    }
  };

  // Exercise 1: renderItem function for FlatList
  const renderItem = ({ item, index }) => (
    <View style={styles.individualWrapper}>
      <Task text={item.text} complete={item.complete} onPress={() => handlePressEvent(index)} />
      <RemoveTask index={index} taskList={taskList} setTaskList={setTaskList} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Today's Tasks</Text>
      </View>
      <View style={styles.taskWrapper}>
        {isLoaded ? (
          <FlatList
            data={taskList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.inputWrapper}>
        <AddTask taskList={taskList} setTaskList={setTaskList}/>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f1f1",
  },
  header: {
    alignItems: "flex-start",
    marginTop: 70,
    marginLeft: 15,
  },
  taskWrapper: {
    flex: 1, 
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  inputWrapper: {
    marginLeft: 15,
    marginRight: 15,
    position: 'absolute',
    bottom: 30,
  },
  text: {
    fontWeight: "bold",
    fontSize: 34,
  },
  individualWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
