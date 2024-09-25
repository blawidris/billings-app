import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EnterAmountScreen({ route, navigation }) {
  const [amount, setAmount] = useState("");
  const predefinedAmounts = [100, 500, 1000, 2000, 3000];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Money</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.title}>Enter Amount</Text>
        <Text style={styles.subtitle}>
          Enter the amount you want to top up your paybills balance with.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.currency}>
            <Text style={styles.currencyText}>NGN</Text>
          </View>
        </View>

        <Text style={styles.selectAmountText}>Select amount</Text>
        <FlatList
          data={predefinedAmounts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.amountButton}
              onPress={() => setAmount(item.toString())}
            >
              <Text style={styles.amountText}>₦{item.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.predefinedAmounts}
          style={styles.scrollContainer}
        />

        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={styles.detailValue}>₦{amount || "0.00"}</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.detailLabel}>Transaction fee:</Text>
            <Text style={styles.detailValue}>₦3.00</Text>
          </View>
          <View style={[styles.transactionRow, styles.totalTransactionRow]}>
            <Text style={styles.detailLabel}>Total Transaction:</Text>
            <Text style={styles.detailValue}>
              ₦{amount ? (parseFloat(amount) + 3).toFixed(2) : "0.00"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            console.log("Proceed to payment");
          }}
        >
          <Text style={styles.payButtonText}>Pay Now using Paystack</Text>
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
    paddingBottom: 10,
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
    fontSize: 18,
    color: "#fff",
    marginBottom: 25,
  },
  amountContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Aeonik TRIAL",
    marginBottom: 10,
    textAlign: "left",
    lineHeight: 18.24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Aeonik TRIAL",
    color: "rgba(160, 157, 157, 1)",
    marginBottom: 20,
    textAlign: "left",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(196, 196, 196, 1)",
    borderRadius: 10,
    marginBottom: 20,
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
  selectAmountText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
    textAlign: "left",
  },
  scrollContainer: {
    flexGrow: 0,
    height: 50,
    marginBottom: 20,
    backgroundColor: "rgba(170, 170, 170, 0.08)",
  },
  predefinedAmounts: {
    justifyContent: "flex-start",
    alignItems: "center",
    color: "rgba(144, 144, 144, 1)",
  },
  amountButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "rgba(170, 170, 170, 0.5)",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginRight: 10,
    minWidth: 70,
    height: 40,
    width: 96,
  },
  amountText: {
    fontSize: 14,
    textAlign: "center",
  },
  transactionDetails: {
    backgroundColor: "rgba(249, 249, 249, 1)",
    padding: 15,
    borderRadius: 10,
    marginTop: 38,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: "rgba(144, 144, 144, 1)",
  },
  detailValue: {
    fontSize: 14,
    color: "#000",
  },
  totalTransactionRow: {
    marginTop: 10,
  },
  payButton: {
    backgroundColor: "rgba(31, 108, 171, 1)",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: 48,
    bottom: 15,
    left: 20,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
