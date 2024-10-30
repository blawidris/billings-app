import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { forwardRef, useMemo, useState } from "react";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  OTPContainer,
  OTPInput,
  OtpBackground,
  WelcomeOverlay,
  MailCover,
  SubmitButton,
  SubmitButtonText,
  OTPHeaderText,
  OTPHeaderSubHeaderText,
  OTPFooterText,
  SupportContainer,
} from "@/components/account.styles";

export const CustomBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => [props.snapPoints], []);
  // Updated to 4 characters

  const handleOTPChange = (value, index) => {
    // Use otp from props or provide a fallback to prevent undefined
    const newOTP = [...(props.otp || ["", "", "", ""])];
    newOTP[index] = value;

    props.setOTP(newOTP);

    // Move focus to the next input field if any
    if (value && index < 3) {
      const nextInput = `otp${index + 1}`;
      this[nextInput]?.focus(); // Use optional chaining
    }
  };

  const renderContent = () => {
    switch (props.type) {
      case "saveBeneficiary":
        return (
          <View style={styles.contentContainer}>
            <View style={{ gap: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 18,
                    color: "rgba(31, 108, 171, 1)",
                  }}
                >
                  Save Beneficiary
                </Text>
                <TouchableOpacity onPress={props.onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              {/* <Text style={styles.containerHeadline}>Save Beneficiary</Text> */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter unique nickname"
                  // keyboardType="numeric"
                />
                <View style={styles.currency}>
                  <Text style={styles.currencyText}>Optional</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>Save Beneficiary</Text>
            </TouchableOpacity>
          </View>
        );
      case "schedulePayment":
        return (
          <View style={styles.contentContainer}>
            <View style={{ gap: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 18,
                    color: "rgba(31, 108, 171, 1)",
                  }}
                >
                  Review
                </Text>
                <TouchableOpacity onPress={props.onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 95,
                  backgroundColor: "rgba(238, 245, 252, 1)",
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 25,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 30,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={props.selectedOption.icon}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={{ fontFamily: "Aeonik TRIAL", fontSize: 14 }}>
                      {props.sub} Recharge
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Aeonik TRIAL",
                        fontSize: 32,
                        fontWeight: "700",
                        color: "rgba(31, 108, 171, 1)",
                      }}
                    >
                      ₦{props.amount}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ gap: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(144, 144, 144, 1)",
                    }}
                  >
                    Beneficiary
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(0, 0, 0, 1)",
                    }}
                  >
                    {props.phoneNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(144, 144, 144, 1)",
                    }}
                  >
                    Narration
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(0, 0, 0, 1)",
                    }}
                  >
                    {props.selectedOption.name}/Airtime
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(144, 144, 144, 1)",
                    }}
                  >
                    Service Provider
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(0, 0, 0, 1)",
                    }}
                  >
                    {props.selectedOption.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(144, 144, 144, 1)",
                    }}
                  >
                    Charges
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Aeonik TRIAL",
                      fontSize: 14,
                      fontWeight: "400",
                      color: "rgba(0, 0, 0, 1)",
                    }}
                  >
                    ₦{props.amount}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.payButton}
              onPress={props.handlePress}
            >
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        );
      case "enterPassword":
        return (
          <View style={styles.contentContainer}>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 18,
                    color: "rgba(31, 108, 171, 1)",
                  }}
                >
                  Enter Password
                </Text>
                <TouchableOpacity onPress={props.onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: "Aeonik TRIAL",
                  fontSize: 14,
                  fontWeight: "400",
                  color: "rgba(144, 144, 144, 1)",
                }}
              >
                Enter password to confirm transaction
              </Text>

              {/* <View style={{gap: 15}}> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 25,
                  marginBottom: 20,
                }}
              >
                {[0, 1, 2, 3].map((_, index) => (
                  <OTPInput
                    key={index}
                    ref={(input) => (this[`otp${index}`] = input)}
                    value={props.otp ? props.otp[index] : ""}
                    onChangeText={(value) => handleOTPChange(value, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    returnKeyType="done"
                  />
                ))}
                {/* </View> */}
              </View>
            </View>
            <TouchableOpacity
              style={styles.payButton}
              onPress={props.handlePress}
            >
              {props.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.payButtonText}>Pay Now</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: "rgba(228, 228, 228, 1)" }}
      backgroundStyle={{ backgroundColor: "#fff" }}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
    >
      {renderContent()}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(196, 196, 196, 1)",
    borderRadius: 10,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 48,
  },
  input: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
  },
  currency: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  currencyText: {
    fontSize: 16,
    color: "#666",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
  contentContainer: {
    padding: 20,
    // alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    borderTopLeftRadius: 50, // Increase this value for more rounded corners
    borderTopRightRadius: 50, // Increase this value for more rounded corners
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    paddingBottom: 20,
    color: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  passwordInput: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
  },
  payButton: {
    backgroundColor: "rgba(31, 108, 171, 1)",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    width: "100%",
    height: 48,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
