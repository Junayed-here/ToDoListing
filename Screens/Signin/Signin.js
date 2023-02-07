import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';

export default function Signin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [isSubmitActive, setIsSubmitActive] = React.useState(false);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
  useEffect(() => {
    submitButtonIsActive();
  }, [email,password,emailError,passwordError]);

  function handleEmailChange() {
    console.log(email);
    if (reg.test(email) === false) {
      setEmailError(true)
      return false;
    }
    else {
      setEmailError(false)
    }
  }
  function handlePasswordInput(password) {
    const passwordval = password.replace(/ +/g, '').trim();
    setPassword(passwordval);
    (password.length < 8) ? setPasswordError(true) : setPasswordError(false);
    submitButtonIsActive();
  }
  function handlePasswordChange() {
    (password.length < 8) ? setPasswordError(true) : setPasswordError(false);
  }

  function submitButtonIsActive() {
    if (reg.test(email) && password !== '' && !emailError && !passwordError) {
      setIsSubmitActive(true);
    } else {
      setIsSubmitActive(false);
    }
  }

  function onPressedButton() {
    if(isSubmitActive){
      console.log(email,password)
    }
  }

  return (
    <>
      <View>
        <Image style={styles.logoImage} source={require('../../assets/icon.png')} />
        <Text style={styles.titleText}>Sign In</Text>
        <Text style={styles.subTitleText}>Make your ToDo list in a simpler way</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            onBlur={handleEmailChange}
            // autoCorrect={false}
            // autoComplete={false}
            value={email}
          />
          {emailError && <Text style={styles.errorText}>Email address is not valid!</Text>}
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => handlePasswordInput(text)}
            onBlur={handlePasswordChange}
            secureTextEntry={true}
            value={password}
          // autoComplete={false}
          />
          {passwordError && <Text style={styles.errorText}>Minimum 8 characters!</Text>}
        </View>

        <View>
          <Pressable><Text style={styles.forgetPasswordText}>Forgot Password?</Text></Pressable>
        </View>

        <Pressable onPress={onPressedButton} style={
          (isSubmitActive) ? ({ pressed }) =>
            (pressed
              ? styles.signupButtonPressed
              : styles.signupButton)
            : styles.signupButtonInactive
        }>
          <Text style={(isSubmitActive) ? styles.buttonText : styles.buttonTextInactive}>Sign In</Text>
        </Pressable>

      </View>
      <View style={styles.multiTextLine}>
        <View>
          <Text style={styles.subTitleText}>Not register yet?</Text>
        </View>
        <View>
          <Pressable><Text style={styles.linkText}>SIGN UP</Text></Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20
  },
  input: {
    padding: 16,
    paddingLeft: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    fontSize: 16,
    fontFamily: 'Lexend-Regular',
    // marginVertical: 10,
  },
  errorText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 14,
    color: '#ffabab',
    height: 20,
    marginTop: 5,
  },
  formContainer: {
    width: 315,
    marginTop: 50,
  },
  titleText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 42,
    textAlign: 'center',
  },
  subTitleText: {
    fontFamily: 'Lexend-Light',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10
  },
  linkText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 5
  },
  forgetPasswordText: {
    fontFamily: 'Lexend-Regular',
    color: "#9B9B9B",
    fontSize: 16,
    marginTop: 10,
    textAlign: "right",
  },
  signupButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 50,
    marginTop: 64,
    justifyContent: "center",
    alignItems: "center",
    // shadow for andorid
    elevation: 10,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  signupButtonPressed: {
    backgroundColor: "rgba(0,0,0,.8)",
    borderRadius: 50,
    height: 50,
    marginTop:  64,
    justifyContent: "center",
    alignItems: "center",
    // shadow for andorid
    elevation: 10,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  signupButtonInactive: {
    backgroundColor: "#fff",
    borderColor: "#B8B8B8",
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
    marginTop:  64,
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",

    // shadow for andorid
    elevation: 10,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  buttonText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 18,
    color: "#fff",
  },
  buttonTextInactive: {
    fontFamily: 'Lexend-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: "#000",
    lineHeight: 18,
  },
  multiTextLine: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: 'center',
  },
});
