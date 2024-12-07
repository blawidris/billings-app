import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function TransactionErrorScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            marginTop: 60,
          }}
        >
          <Image
            source={require("@/assets/icons/error.png")}
            resizeMode="contain"
          />
          <View
            style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
          >
            <Text
              style={{
                fontFamily: "Aeonik TRIAL",
                fontSize: 24,
                fontWeight: "400",
                color: "rgba(37, 59, 75, 1)",
              }}
            >
              Failed transaction
            </Text>
            <Text
              style={{
                fontFamily: "Aeonik TRIAL",
                fontSize: 16,
                fontWeight: "400",
                color: "rgba(144, 144, 144, 1)",
              }}
            >
              Power purchase not successful
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.payButton}
            //   onPress={() => {
            //     setIsPayNow(true)
            //   }}
          >
            <Text style={styles.payButtonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/home")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Aeonik TRIAL",
                fontSize: 14,
                fontWeight: "700",
                color: "rgba(31, 108, 171, 1)",
              }}
            >
              Return Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  amountContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  payButton: {
    backgroundColor: "rgba(31, 108, 171, 1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    // position: "absolute",
    width: "100%",
    height: 48,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
