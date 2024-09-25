import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AddMoneyOptionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Money</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/card", { method: "card" })}
        >
          <View style={styles.optionIcon}>
            <Image source={require("@/assets/card-add.png")} />
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Add money via card</Text>
            <Text style={styles.optionDescription}>
              Add money to your balance via card payment using paystack
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/transfer", { method: "bankTransfer" })}
        >
          <View style={styles.optionIcon}>
            <Image source={require("@/assets/bank.png")} />
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Add money via bank transfer</Text>
            <Text style={styles.optionDescription}>
              Add money to your balance via bank transfer by directing sending
              money to your designated account number.
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "rgba(31, 108, 171, 1)",
    paddingHorizontal: 15,
    height: 118,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: "absolute",
    left: 15,
    bottom: 25,
  },
  headerTitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 24,
    fontFamily: "Raleway",
    fontWeight: "semibold",
  },
  optionsContainer: {
    flex: 1,
    padding: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    height: "18%",
    gap: 10,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Aeonik TRIAL",
    lineHeight: 15.96,
  },
  optionDescription: {
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Aeonik TRIAL",
    color: "rgba(144, 144, 144, 1)",
    lineHeight: 15.96,
  },
});
