import * as React from 'react';
import { Button, StyleSheet, View, ImageBackground, TextInput, Animated, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Btn from '../components/Btn';

export default function CardDetails({}) {
  const navigation = useNavigation();
  const [isAnimating, setIsAnimating] = React.useState(true);
  const [placeholder, setPlaceholder] = React.useState("XXXX   XXXX   XXXX   XXXX");
  const [expire, setExpire] = React.useState("MM/YY");
  const [cvv, setCVV] = React.useState("ↃVV");
  const [initDuration, setInitDuration] = React.useState(0);
  const [durations, setDuartion] = React.useState(3000);

  const screenHeight = Dimensions.get('window').width;
  const desiredHeight = screenHeight * 0.55;

  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const RotateAnim = () => {

    const toValue = isAnimating ? 1 : 0;

    Animated.timing(rotateAnim, {
      toValue,
      duration: durations,
      useNativeDriver: true,
    }).start(() => {
      setIsAnimating(!isAnimating);
      if(durations<3000){
        setIsAnimating(!isAnimating);
      }
      setIsAnimating(!isAnimating);
     
    });
  }


  const interpolatedRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],

  });
  // console.log(interpolatedRotate);
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            transform: [{ rotateY: interpolatedRotate }],
          },
          { width: "90%", height: "90%", justifyContent: "flex-start", alignItems: "flex-start", height: "50%", zIndex: 1, position: "relative", bottom: "50%" }
        ]}>
        <View style={[styles.card, {height: desiredHeight}]}>
          <View style={{ opacity: 0.3, backgroundColor: 'black' }}>
            <ImageBackground
              source={{ uri: 'https://th.bing.com/th/id/OIG.AzAodbIzmvO1k_N6jJSZ?pid=ImgGn&w=1024&h=1024&rs=1' }}
              style={styles.img}
            />
          </View>
          <View style={{top: '-67%'}}>
            <TextInput
              style={{ borderWidth: 1, margin: 9, padding: 10, fontSize: 22, textAlign: "center", display: isAnimating ? 'flex' : 'none' }}
              placeholder={placeholder}
              inputMode="numeric"
              maxLength={16}
              onChangeText={(val) => {
                let ind = placeholder.indexOf("X");

                setPlaceholder((newVal) => newVal.replace(placeholder[ind], val));
              }}
            />
            <View style={{ position: "relative", left: 70, flexDirection: "row", display: isAnimating ? 'flex' : 'none' }}>
              <View style={{ position: "relative", right: 50 }}>
                <Text style={{ display: interpolatedRotate === '90deg' ? 'none' : 'flex' }}>Expires</Text>
                <Text style={{ display: interpolatedRotate === '90deg' ? 'none' : 'flex' }}>End</Text>
              </View>
              <TextInput
                onChangeText={(val) => {
                  let ind = expire.indexOf("M");
                  if (ind !== -1) {
                    setExpire((newVal) => newVal.replace(expire[ind], val));
                  }
                  else {
                    ind = expire.indexOf("Y");
                    setExpire((newVal) => newVal.replace(expire[ind], val));
                  }
                }}
                style={{ borderWidth: 1, padding: 10, display: interpolatedRotate <= '90deg' && isAnimating ? 'none' : 'flex' }}
                placeholder={expire}
                inputMode="numeric"
              />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "black", position: "relative", bottom: "100%", left: "20%", width: "85%", left: "7%" }}>
        <TextInput
          // onFocus={RotateAnim}
          // onBlur={RotateAnim}
          style={{ borderWidth: 1, width: "20%", padding: 10, display: !isAnimating ? 'flex' : 'none', backgroundColor: "white", position: "relative", left: "5%", textAlign: "center" }}
          placeholder={cvv.split('').reverse().join('')}
          onChangeText={(val) => {
            let ind = cvv.indexOf("Ↄ");
            if (ind !== -1) {
              setCVV((newVal) => newVal.replace(cvv[ind], val));
            }
            else {
              ind = cvv.indexOf("V");
              setCVV((newVal) => newVal.replace(cvv[ind], val));
            }
          }}
        />
      </View>
      </Animated.View>
      <Btn text="Proceed to Payment" func={() => navigation.navigate("Payment", {cvv, placeholder, expire})} />
      <Btn text="Flip Card" func={RotateAnim} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "120%",
    borderRadius: 20,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  fadingContainer: {
    width: 200,
    height: 200,
  }
});