import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
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
        top: "-20%",
        right: 90
      },
    
      lightCircle: {
        borderRadius: 320/2,
        height: 320,
        width: 320,
        backgroundColor: "#D1A4F3",
        top: "-15%",
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
      },

      pageContainer:{
        borderWidth: 1,
        height: "75%",
        width: "85%",
        borderRadius: 40,
        alignContent:'center',
      },
      
      shadow:{
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 7},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }

})


export default styles;