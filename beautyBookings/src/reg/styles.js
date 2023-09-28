import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    icon: {
      height: 200,
      width: 300,
      marginTop: 130,
    },
    formView: {
      margin: 'auto',
      flex: 1,
      marginBottom: 100,
    },
    centerView: {
      flex: 2,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    input: {
      height: 40,
      marginVertical: 5,
      backgroundColor: 'wheat',
      borderRadius: 12,
      width: 300,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
    },
    submit: {
      height: 40,
      marginVertical: 5,
      backgroundColor: 'purple',
      borderRadius: 12,
      width: 300,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      marginTop: 5,
    },
    submitText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    },
    imageView: {
      flex: 1,
    },
    parentView: {
      backgroundColor: 'white',
    },
});

module.export = styles
  