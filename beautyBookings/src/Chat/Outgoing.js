import {View, Text, StyleSheet} from "react-native";

const Outgoing = ({outgoingMsg}) => {
  return(
    <View style={outgoing.background}>
      <Text style={{color: "white"}}>{outgoingMsg || 'No incoming text'}</Text>
    </View>
  );
}

export default Outgoing;

const outgoing = StyleSheet.create({
  background : {
    backgroundColor: "purple",
    width: "60%",
    alignSelf: "flex-end",
    marginBottom: 10,
    borderRadius: 4,
    // position: "relative",
    // top: 100
  }
})