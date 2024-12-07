import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {
  ReceiptOverlay,
  ReceiptContainer,
  WelcomeBackground,
  ReceiptBackground,
  SignUpButton,
  SignInButton,
  SignUpText,
  SignInText,
} from "@/components/account.styles";
import React from "react";

export const TransactionReceiptScreen = () => {
  return (
    <ReceiptOverlay>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <ReceiptBackground>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 25,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: "#F9F9F9",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={require("@/assets/Mail.png")} />
            </View>
            <View style={{ alignItems: "center", marginTop: 10, gap: 10 }}>
              <Text
                style={{
                  fontFamily: "Aeonik TRIAL",
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                Payment Success
              </Text>
              <Text
                style={{
                  fontFamily: "Aeonik TRIAL",
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#fff",
                }}
              >
                Airtime recharged successfully
              </Text>
            </View>

            <View
              style={{
                gap: 25,
                justifyContent: "space-between",
                width: 280,
                marginTop: 20,
              }}
            >
              <Image
                source={require("@/assets/line.png")}
                style={{ width: "auto" }}
                resizeMode="contain"
              />
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
                    color: "#fff",
                  }}
                >
                  Beneficiary
                </Text>
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#fff",
                  }}
                >
                  09087656534
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
                    color: "#fff",
                  }}
                >
                  Service Provider
                </Text>
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#fff",
                  }}
                >
                  MTN
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
                    color: "#fff",
                  }}
                >
                  Session ID
                </Text>
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#fff",
                  }}
                >
                  765787687T87T87T87
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
                    color: "#fff",
                  }}
                >
                  Amount
                </Text>
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#fff",
                  }}
                >
                  ₦3000.00
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
                    color: "#fff",
                  }}
                >
                  Charges
                </Text>
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#fff",
                  }}
                >
                  ₦10.00
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
                    color: "#fff",
                  }}
                >
                  Total Debt
                </Text>
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#fff",
                  }}
                >
                  ₦1100.00
                </Text>
              </View>
              <Image
                source={require("@/assets/line.png")}
                style={{ width: "auto" }}
                resizeMode="contain"
              />
            </View>
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <Image
                source={require("@/assets/barcode.png")}
                resizeMode="contain"
              />
              <Text style={{ marginTop: 5, color: "#fff" }}>
                HUI345DSERFGT768ff
              </Text>
            </View>
          </View>
        </ReceiptBackground>
        <View style={{ gap: 10 }}>
          <SignUpButton>
            <SignUpText>Share Receipt</SignUpText>
          </SignUpButton>
          <SignInButton>
            <SignInText>Download Receipt</SignInText>
          </SignInButton>
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontFamily: "Aeonik TRIAL",
                fontSize: 14,
                fontWeight: "700",
                color: "#fff",
              }}
            >
              Return Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReceiptOverlay>
  );
};

const styles = StyleSheet.create({});
