import * as React from 'react';
import { Button, StyleSheet, View, ImageBackground, TextInput, Animated, Text } from 'react-native';


export default function CardDetails() {
  const [isAnimating, setIsAnimating] = React.useState(true);
  const [placeholder, setPlaceholder] = React.useState("XXXX   XXXX   XXXX   XXXX");
  const [expire, setExpire] = React.useState("MM/YY");
  const [cvv, setCVV] = React.useState("ↃVV");
  const [initDuration, setInitDuration] = React.useState(0);
  const [durations, setDuartion] = React.useState(3000);

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
          { width: "90%", height: "70%", justifyContent: "flex-start", alignItems: "flex-start" }
        ]}>
        <View style={styles.card}>
          <View style={{ opacity: 0.4, backgroundColor: 'purple' }}>
            <ImageBackground
              source={{ uri: 'https://th.bing.com/th/id/OIG.AzAodbIzmvO1k_N6jJSZ?pid=ImgGn&w=1024&h=1024&rs=1' }}
              style={styles.img}
            />
          </View>
          <View style={{}}>
            <TextInput
              style={{ borderWidth: 1, marginHorizontal: 9, padding: 10, top: "-160%", fontSize: 22, textAlign: "center", display: isAnimating ? 'flex' : 'none' }}
              placeholder={placeholder}
              inputMode="numeric"
              maxLength={16}
              onChangeText={(val) => {
                let ind = placeholder.indexOf("X");
                console.log(ind)
                setPlaceholder((newVal) => newVal.replace(placeholder[ind], val));
              }}
            />
            <View style={{ position: "relative", left: 70, bottom: "40%", flexDirection: "row", display: isAnimating ? 'flex' : 'none' }}>
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
                style={{ borderWidth: 1, width: "20%", padding: 10, display: interpolatedRotate <= '90deg' && isAnimating ? 'none' : 'flex' }}
                placeholder={expire}
                inputMode="numeric"
              />
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "black", position: "relative", bottom: "45%", left: "20%", width: "70%", left: "10%" }}>
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
      
      <Button title="click" onPress={RotateAnim} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "60%",
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