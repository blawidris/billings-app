import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { host } from "@/utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { isNewBackTitleImplementation } from "react-native-screens";
import { UserData } from "@/@types/index.ts";
import { getUserData } from "@/services/api";

export default function CardScreen({ navigation }) {
  const username = useSelector((state) => state.bvn.username);
  const user = useSelector((state) => state.signUp.user);

  const firstName = useSelector((state) => state.signUp.firstName);
  const lastName = useSelector((state) => state.signUp.lastName);
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    //alert("Account number copied to clipboard!");
    ToastAndroid.show(
      "Account number copied to clipboard!",
      ToastAndroid.SHORT
    );
  };

  const [userInfo, setUserInfo] = useState();
  const [wallet, setWallet] = useState();

  useEffect(() => {
    const getInfo = async () => {
      const token = await AsyncStorage.getItem("token");
      const userDataResponse = await getUserData(token);
      setUserInfo(userDataResponse.user);
      setWallet(userDataResponse.wallet);
      console.log("rrr", userDataResponse);
    };
    getInfo();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Money</Text>
      </View>

      {/* Virtual Account Card */}
      {wallet?.virtualAccount && (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text className="text-base text-white">
              {wallet.virtualAccount.bankName || wallet || "N/A"}
            </Text>
            <View style={styles.cardRow}>
              <Text style={styles.accountNumber}>
                {wallet.virtualAccount?.accountNumber || "N/A"}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  copyToClipboard(userInfo?.virtualAccount?.accountNumber)
                }
                style={styles.copyButton}
              >
                <Ionicons name="copy-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardsRow}>
              <Text style={styles.accountHolder}>
                {wallet.virtualAccount?.accountName || "N/A"}
              </Text>
              <Text style={styles.virtualAccount}>Virtual account</Text>
            </View>
          </View>
        </View>
      )}

      {/* Info Text */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Top up your wallet by transferring or telling anyone to transfer to
          your <Text style={styles.boldText}>account number above</Text>, it
          reflects immediately on your{" "}
          <Text style={styles.boldText}>Paybills balance</Text>.
        </Text>
      </View>

      {/* Chat Support */}
      <TouchableOpacity style={styles.supportContainer}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#000" />
        <Text style={styles.supportText}>Chat with support</Text>
      </TouchableOpacity>
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
    height: 176,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 70,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Aeonik TRIAL",
    position: "absolute",
    left: 150,
    top: 70,
    color: "#fff",
  },
  cardContainer: {
    position: "absolute",
    top: 120, // Ensures a balanced overlap with the header
    left: 20,
    right: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(31, 108, 171, 1)", // Matching card color with header
    width: "100%",
    height: 177, // Card height adjusted
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
  },
  bankName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  accountHolder: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },
  virtualAccount: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
  },
  copyButton: {
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  infoContainer: {
    marginTop: 150, // Adjusted to allow better spacing between card and text
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  supportContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  supportText: {
    marginTop: 5,
    fontSize: 14,
    color: "#000",
  },
});
