import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    img: {
        height: 200,
        width: 200, 
    },
     darkCircle: {
        borderRadius: 300/2,
        height: 300,
        width: 300,
        backgroundColor: "#7434A4",
        top: -90,
        right: 90
      },
    
      lightCircle: {
        borderRadius: 320/2,
        height: 320,
        width: 320,
        backgroundColor: "#D1A4F3",
        top: -45,
        right: 160
      },
    
      circles:{
        position: 'absolute',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row'
      },

      header:{
        fontSize: 35,
        fontWeight: 'bold'
      }
})


export default styles;