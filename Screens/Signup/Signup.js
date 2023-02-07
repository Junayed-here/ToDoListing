import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';

export default function Signup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [nameError, setNextError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const [isSubmitActive, setIsSubmitActive] = React.useState(false);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
  useEffect(() => {
    submitButtonIsActive();
  }, [name,email,password,confirmPassword,nameError,emailError,passwordError,confirmPasswordError]);

  function handleNameChange() {
    const nameval = name.replace(/  +/g, ' ').trim();
    setName(nameval);
    (nameval.length < 3) ? setNextError(true) : setNextError(false);
  }
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
    setConfirmPassword('');
  }
  function handlePasswordChange() {
    (password.length < 8) ? setPasswordError(true) : setPasswordError(false);
  }

  function handleConfirmPasswordInput(password) {
    const passwordval = password.replace(/ +/g, '').trim();
    setConfirmPassword(passwordval);
    console.log(passwordval);
    submitButtonIsActive();
  }
  function handleConfirmPasswordChange() {
    (password !== confirmPassword) ? setConfirmPasswordError(true) : setConfirmPasswordError(false);
  }

  function submitButtonIsActive() {
    if (name.length > 3 && reg.test(email) && password !== '' && confirmPassword !== '' && !nameError && !emailError && !passwordError && !confirmPasswordError
     && (password === confirmPassword)) {
      setIsSubmitActive(true);
    } else {
      setIsSubmitActive(false);
    }
  }

  function onPressedButton() {
    if(isSubmitActive){
      console.log(name,email,password)
    }
  }

  return (
    <>
      <View>
        <Image style={styles.logoImage} source={require('../../assets/icon.png')} />
        <Text style={styles.titleText}>Sign Up</Text>
        <Text style={styles.subTitleText}>Make your ToDo list in a simpler way</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            placeholder="Name"
            maxLength={20}
            // autoCorrect={false}
            // autoComplete={false}
            onBlur={handleNameChange}
            value={name}
          />
          {nameError && <Text style={styles.errorText}>Name is too short!</Text>}
        </View>

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
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleConfirmPasswordInput(text)}
            onBlur={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
          // autoComplete={false}
          />
          {confirmPasswordError && <Text style={styles.errorText}>Password doesn't match!</Text>}
        </View>

        <Pressable onPress={onPressedButton} style={
          (isSubmitActive) ? ({ pressed }) =>
            (pressed
              ? styles.signupButtonPressed
              : styles.signupButton)
            : styles.signupButtonInactive
        }>
          <Text style={(isSubmitActive) ? styles.buttonText : styles.buttonTextInactive}>Sign Up</Text>
        </Pressable>

      </View>
      <View style={styles.multiTextLine}>
        <View>
          <Text style={styles.subTitleText}>Have an account?</Text>
        </View>
        <View>
          <Pressable><Text style={styles.linkText}>SIGN IN</Text></Pressable>
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
