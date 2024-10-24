import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CountryPicker from "react-native-country-picker-modal";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  Container,
  Header,
  HeaderText,
  SubHeaderText,
  Form,
  Input,
  ContinueButton,
  ContinueButtonText,
  SocialButtons,
  SocialButton,
  SignupFooterText,
  SupportText,
  PickerWrapper,
  PasswordContainer,
  PasswordInput,
  PhoneInputContainer,
  PhoneInput,
  CountryFlagBox,
  PhoneBox,
  FooterText,
  LinkText,
  SupportContainer,
} from "@/components/account.styles";
import { Text } from "../components/typography/text.component";
import { setSignUpInfo, signUp } from "@/redux/slices/authentication/authSlice";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Lock from "@/assets/icons/Lock";
import GenderPicker from "@/utils/GenderPicker";
import Apple from "@/assets/icons/Apple";
import Google from "@/assets/icons/Google";
import Support from "@/assets/icons/Support";
import OrDivider from "@/utils/OrDivider";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function SignUpOneScreen({ navigation }) {
  const dispatch = useDispatch();
  const signUpState = useSelector((state) => state.signUp);
  const [firstName, setFirstName] = useState(signUpState.firstName || "");
  const [lastName, setLastName] = useState(signUpState.lastName || "");
  const [email, setEmail] = useState(signUpState.email || "");
  const [phone, setPhone] = useState(signUpState.phone || "");
  const [password, setPassword] = useState(signUpState.password || "");
  const [referral, setReferral] = useState(signUpState.referral || "");

  const [countryCode, setCountryCode] = useState("NG");
  const [callingCode, setCallingCode] = useState("234");
  const [gender, setGender] = useState("Gender");
  const [dob, setDob] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Input validation functions
  const validateFirstName = (name) => /^[A-Za-z]+$/.test(name);
  const validateLastName = (name) => /^[A-Za-z]+$/.test(name);
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePhoneNumber = (number) => /^\d{7,15}$/.test(number);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
  const validateDOB = (date) => {
    const ageDiff = Date.now() - date.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(date);
    hideDatePicker();
  };

  const handleContinue = async () => {
    // Perform validations
    if (!firstName || !validateFirstName(firstName)) {
      Toast.show({
        type: "error",
        text1: "Invalid First Name",
        text2: "Please enter a valid first name.",
      });
      return;
    }

    if (!lastName || !validateLastName(lastName)) {
      Toast.show({
        type: "error",
        text1: "Invalid Last Name",
        text2: "Please enter a valid last name.",
      });
      return;
    }

    if (!email || !validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address.",
      });
      return;
    }

    if (!phone || !validatePhoneNumber(phone)) {
      Toast.show({
        type: "error",
        text1: "Invalid Phone Number",
        text2: "Please enter a valid phone number.",
      });
      return;
    }

    if (!gender) {
      Toast.show({
        type: "error",
        text1: "Gender Required",
        text2: "Please select your gender.",
      });
      return;
    }

    if (!dob || !validateDOB(dob)) {
      Toast.show({
        type: "error",
        text1: "Invalid Date of Birth",
        text2: "You must be at least 18 years old.",
      });
      return;
    }

    if (!password || !validatePassword(password)) {
      Toast.show({
        type: "error",
        text1: "Weak Password",
        text2:
          "Password must be at least 6 characters long and include letters and numbers.",
      });
      return;
    }

    const formattedReferralCode = referral ? referral.toString() : "";

    // Save data to Redux store
    dispatch(
      setSignUpInfo({
        countryCode,
        callingCode,
        gender,
        dob: new Date(dob).toISOString(),
        firstName,
        lastName,
        email,
        phone,
        password,
        referral: formattedReferralCode,
      })
    );
    setIsLoading(true);

    try {
      await dispatch(
        signUp({
          firstName,
          lastName,
          email,
          phone: "+" + callingCode + phone,
          password,
          gender,
          dob: new Date(dob).toISOString(),
          referral: formattedReferralCode,
        })
      )
        .unwrap()
        .then(() => {
          // Show success toast and navigate on successful signup
          Toast.show({
            type: "success",
            text1: "SignUp Successful",
            text2: "Proceeding to the next step.",
          });
          router.push("/otp");
        });
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "SignUp Failed",
        text2: error.message,
      });
    } finally {
      // This will execute regardless of success or failure
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header>
          <HeaderText>Sign Up</HeaderText>
          <SubHeaderText>
            Create an account to start using PayBills
          </SubHeaderText>
        </Header>
        <Form>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="rgba(196, 196, 196, 1)"
            className="p-2 h-full border-[0.5px] border-gray-400 mt-3 rounded-md flex-1 text-[rgba(196, 196, 196, 1)]"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="rgba(196, 196, 196, 1)"
            className="p-2 h-full border-[0.5px] border-gray-400 mt-3 rounded-md flex-1 text-[rgba(196, 196, 196, 1)]"
          />
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="rgba(196, 196, 196, 1)"
            className="p-2 h-full border-[0.5px] border-gray-400 mt-3 rounded-md flex-1 text-[rgba(196, 196, 196, 1)]"
          />
          <PhoneInputContainer>
            <CountryFlagBox>
              <CountryPicker
                withFlag
                countryCode={countryCode}
                withAlphaFilter={false}
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCallingCode(country.callingCode[0]);
                }}
                styles={{
                  flag: {
                    width: 109,
                    height: 30,
                    marginLeft: 5,
                  },
                }}
              />
            </CountryFlagBox>
            <PhoneBox>
              <View>
                <FooterText>+{callingCode}</FooterText>
              </View>
              <PhoneInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="Phone Number"
              />
            </PhoneBox>
          </PhoneInputContainer>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <GenderPicker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              items={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />
            <TouchableOpacity
              onPress={() => setDatePickerVisibility(true)}
              style={{ flex: 1, marginLeft: 8 }}
            >
              <Input
                placeholder="Date of Birth"
                value={dob ? dob.toDateString() : ""}
                editable={false}
              />
              <FontAwesome
                name="chevron-down"
                size={14}
                color="rgba(196, 196, 196, 1)"
                style={{ position: "absolute", right: 10, top: 18 }}
              />
            </TouchableOpacity>
          </View>
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              borderColor: "rgba(196, 196, 196, 1)",
              borderRadius: 10,
              borderWidth: 0.5,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Lock />
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              className="p-2 h-full border-[rgba(196, 196, 196, 1)] flex-1 text-[rgba(196, 196, 196, 1)]"
            />
            <FontAwesome
              name={isPasswordVisible ? "eye-slash" : "eye"}
              size={20}
              color="rgba(196, 196, 196, 1)"
              onPress={() => setPasswordVisibility(!isPasswordVisible)}
              style={{ marginLeft: 10 }}
            />
          </View>
          <TextInput
            placeholder="Referral Code (Optional)"
            value={referral}
            onChangeText={setReferral}
            placeholderTextColor="rgba(196, 196, 196, 1)"
            className="p-2 h-full border-[0.5px] border-gray-400 mt-3 rounded-md flex-1 text-[rgba(196, 196, 196, 1)]"
          />
          <TouchableOpacity
            className="flex flex-row items-center justify-center p-5 mt-5 bg-[#1F6CAB] rounded-full"
            onPress={handleContinue}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <ContinueButtonText>Continue</ContinueButtonText>
            )}
          </TouchableOpacity>
        </Form>
        <View
          styles={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OrDivider />
        </View>
        <SocialButtons>
          <SocialButton>
            <Google />
          </SocialButton>
          <SocialButton>
            <Apple />
          </SocialButton>
        </SocialButtons>
        <SignupFooterText>
          Already have an account? <LinkText>Login</LinkText>
        </SignupFooterText>
        {/* <Support /> */}
        <SupportText>Chat with support</SupportText>
      </ScrollView>
      <Image
        source={require("@/assets/pattern.png")}
        className="absolute bottom-0"
      />
    </Container>
  );
}
