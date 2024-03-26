import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Task({ text, complete, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.square}>
          {complete && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <Text style={[styles.text, complete ? styles.completedText : null]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    paddingLeft: 10,
  },
  square: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    width: 26,
    aspectRatio: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(141, 223, 218, 0.40)',
    margin: 5,
  },
  wrapper: {
    height: 50,
    width: 300,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: "#888",
  },
});
