import { Alert } from "react-native";

export const validatePassword = (password, confirmPassword) => {
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/;

  if (
    password.length < 8 ||
    !lowercaseRegex.test(password) ||
    !uppercaseRegex.test(password) ||
    !numberRegex.test(password) ||
    !specialCharRegex.test(password)
  ) {
    Alert.alert(
      "Oops",
      "Password should have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character",
      [
        {
          text: "Ok",
        },
      ]
    );
    return false;
  }

  if (password !== confirmPassword) {
    Alert.alert("Oops", "Passwords should match", [
      {
        text: "Ok",
      },
    ]);
    return false;
  }

  return true;
};

export const checkEmail = (email) => {
  const userEmail = email.trim();
  if (userEmail.indexOf("@") === -1 || userEmail.indexOf(".") === -1) {
    console.log(userEmail);
    Alert.alert("Oops", "Your email address is incorrect, please confirm and try again", [
      {
        text: "Ok",
      },
    ]);
    return false;
  }

  return true;
};

export const validateCell = (cellNo, length) => {
  const onlyNumber = /^\d+$/;
  if (cellNo.length !== 10 || !onlyNumber.test(cellNo)) {
    Alert.alert("Oops", "Cell number should contain 10 digits", [
      {
        text: "Ok",
      },
    ]);
    return false;
  }

  return true;
};

export const required = (name, surname, email, password, cellNo, confirmPassword) => {
  if(name=="" || email == "" || cellNo == "" || password == "" || confirmPassword == "" || surname == ""){
    Alert.alert("Oops", "All fields are required", [{
      text: "Ok"
    }])
  }
}
