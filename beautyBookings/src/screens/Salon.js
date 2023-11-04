// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useCallback, useMemo, useRef, useContext } from 'react';
// Import required components
import {SafeAreaView, StyleSheet, View, Text, ImageBackground, ScrollView, Image, TouchableOpacity} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import MapView, {Marker} from 'react-native-maps';
import { Stars } from './HomeScreen';
import Btn from '../components/Btn';
import Styles from './Style';

export default function SalonLocation({navigation, route}) {

    const mapRef = useRef(null);
    const snapPoints = useMemo(() => ["5%","25%","50%","75%"], []);
    const item = route?.params?.itm;

    const techno = {
      latitude: 35.6762,  
      longitude: 139.6503,  
      latitudeDelta: 0.01,  
      longitudeDelta: 0.01,
    }

    const gotoTechno = () =>{
      mapRef.current.animateToRegion(techno, 3000)
    }

    setTimeout(gotoTechno, 2000)
2
    const btn= {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#D1A4F3',
        margin: 15,
    }

    const text = {
        fontSize: 14,
        textAlign: 'center', 
        color: 'white'
    }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        style={{padding: 10, borderRadius: 10}}
        // backgroundStyle={{backgroundColor:'#7434A4'}}
        enablePanDownToClose={true}
      >
        <View style={[styles.contentContainer,{padding: 10, alignItems: 'center'}]}>
            <Text style={{fontSize: 24, fontWeight: '900', }}>{item['details'].name}</Text>
            <Stars rating={parseInt(item['details'].rating)}/>
        </View>

        <View style={{width: '100%', height: "40%"}}>
            <ImageBackground
                source={{uri: item['image']}}
                style={{flex: 1, backgroundColor: 'black', opacity: .9}}
                resizeMode='cover'
            >

            </ImageBackground>
        </View>

        <Text>{"Provides: "+ item['details'].services}</Text>
        <Text style={{fontSize: 24, fontWeight: '900', }}>Reviews</Text>

        <ScrollView horizontal style={{flex: 1, paddingVertical: 5}}>
          {
            Object.values(item['reviews']).map((element, idx)=>{
              return(
                <View key={idx}
                  style={{
                    borderWidth: 1, 
                    borderRadius: 10, 
                    marginHorizontal: 10, 
                    padding: 15, width: 225,}}
                >
                  <View style={[Styles.shadow, {flexDirection: 'row', }]}>
                    <View style={{borderRadius: 15, height: 27, width: 27, backgroundColor: 'black', alignItems:'center', justifyContent: 'center',marginHorizontal: 5, borderWidth: 1}}>
                      <Text style={{fontSize: 16, fontWeight: '800', color : 'white', textAlign: 'center', }}>
                          {element.name[0]}
                      </Text>
                    </View>
                    <Text>{element.name}</Text>
                  </View>
          
                  <View>
                    <Text>{element.description}</Text>
                    <Stars rating={parseInt(element.rating)}/> 
                  </View>
                          
                </View>
              )             
            })
          }
        </ScrollView> 
          
        <View style={{flexDirection: 'row',}}>
            <TouchableOpacity style={btn} onPress={()=>navigation.navigate("Chat", item.id)}>
                <Text style={text}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={btn} onPress={()=>{navigation.navigate("Book Appointment" , {busId: item.id})}}>
                <Text style={text}>Book</Text>
            </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});