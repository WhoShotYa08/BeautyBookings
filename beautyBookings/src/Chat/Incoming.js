import {View, Text, StyleSheet} from "react-native";
// import {db} from "./firebase";

const Incoming = ({message}) => {
  return(
    <View style={incoming.background}>
      <Text style={{ color: "black" }}>{message || 'No incoming text'}</Text>
    </View>
  );
}

export default Incoming;

const incoming = StyleSheet.create({
  background : {
    backgroundColor: "lightgrey",
    justifyContent: "flex-start",
    width: "60%",
    marginBottom: 10,
    borderRadius: 4,
    // position: "relative",
    // top: 500
  }
})