import emailjs from "@emailjs/browser";
import { Alert, ToastAndroid } from "react-native";

const sendEmail = async (email, otp, name) => {
  const serviceID = 'service_uclo3sd';
  const templateID = 'template_jvfubpr';
  const userID = 'tNqWwkWxgxpO5sZW3';
  await emailjs
    .send(
      serviceID,
      templateID,
      {
        to_name: name,
        message: otp,
        to_email: email,
      },
      userID
    )
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        if (alert === true) {
          return Alert.alert(
            "Success!",
            `Please check your eail ${email} for further infomation.`
          );
        }
        ToastAndroid.showWithGravityAndOffset(
          "An email has been sent to you.",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      }
      return false
    })
    .catch((e) => {
      console.log(e);
    });
}

export { sendEmail }
// Not working due to email js restrictions of only running on browsers: Error 403
