import {View, Text, StyleSheet} from "react-native";
// import {db} from "./firebase";

const Incoming = () => {
  return(
    <View style={incoming.background}>
      <Text style={{color: "black"}}>Incoming Text</Text>
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
    borderRadius: 4
  }
})