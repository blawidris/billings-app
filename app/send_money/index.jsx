import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Button,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native-switch";
import * as Contacts from "expo-contacts";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "@/redux/slices/contact/contactSlice";
import { CustomBottomSheet } from "@/components/bottomsheets/customButtomSheet";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { host } from "@/utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function BuyAirtimeScreen() {
  const [bottomSheetType, setBottomSheetType] = useState("saveBeneficiary");

  const options = [
    {
      id: 1,
      name: "MTN",
      serviceID: "mtn",
      icon: require("@/assets/icons/mtn.png"),
    }, // Replace with the actual path to the icon
    {
      id: 2,
      serviceID: "etisalat",
      name: "9-Mobile",
      icon: require("@/assets/icons/9mobile.jpg"),
    },
    {
      id: 3,
      name: "GLO",
      serviceID: "glo",
      icon: require("@/assets/icons/glo.png"),
    },
    {
      id: 4,
      name: "Airtel",
      serviceID: "airtel",
      icon: require("@/assets/icons/airtel.png"),
    },
  ];
  const [amount, setAmount] = useState("");
  const predefinedAmounts = [100, 500, 1000, 2000, 3000];
  const [isScheduledEnabled, setIsScheduledEnabled] = useState(false);
  const [isSavedEnabled, setIsSavedEnabled] = useState(false);
  const [isEnterPassword, setIsEnterPassword] = useState(false);
  const [isPayNow, setIsPayNow] = useState(false);

  const [permissionStatus, setPermissionStatus] = useState(null);
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [userList, setUserList] = useState([]);

  const [otp, setOTP] = useState(["", "", "", ""]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const fetchUsers = async (query) => {
    if (!query) {
      setUserList([]);
      setShowDropdown(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${host}/p2p/find/${query}`);
      console.log(response.data);
      setUserList({ ...userList, ...response.data?.data });
      setShowDropdown(data.length > 0);
    } catch (error) {
      //console.error("Error fetching users:", error);
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (text) => {
    setPhoneNumber(text);
    fetchUsers(text);
  };

  const handleSelectUser = (user) => {
    setPhoneNumber(user.firstName); // Populate the input with the selected user's name
    setShowDropdown(false);
  };

  const [activeTab, setActiveTab] = useState("Recent");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
      </View>

      <View className="p-5">
        <View className="flex items-center p-3 bg-blue-50">
          <Text className="text-primary">Instant, Zero Issues & Free</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <View className="mb-5">
          <View className="flex flex-row h-12 p-2 border border-gray-400 rounded-lg">
            <TextInput
              className="flex-1"
              placeholder="Phone Number/Paybills ID/Name"
              value={phoneNumber}
              placeholderTextColor="#979797"
              onChangeText={handleInputChange}
            />
          </View>
          <View className="p-3">
            <Text className="text-gray-400">
              Don't Know the recipent's paybill account number?
            </Text>
            <Text className="text-primary">Ask them</Text>
          </View>
        </View>

        {showDropdown && (
          <View style={styles.dropdown}>
            {isLoading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : (
              <FlatList
                data={Array.isArray(userList) ? userList : []}
                keyExtractor={(item) => item.id.toString()}
                className="absolute w-full bg-white rounded-lg shadow-md"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex flex-row items-center p-4 bg-white"
                    onPress={() => handleSelectUser(item)}
                  >
                    <Text style={styles.optionText}>
                      {item.firstName} - {item.lastName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}

        <View className="flex flex-row">
          {/* Recent Tab */}
          <TouchableOpacity
            className={`p-3 px-5 rounded-full ${
              activeTab === "Recent" ? "bg-blue-100" : ""
            }`}
            onPress={() => setActiveTab("Recent")}
          >
            <Text
              className={`${
                activeTab === "Recent" ? "text-primary" : "text-gray-500"
              }`}
            >
              Recent
            </Text>
          </TouchableOpacity>

          {/* Beneficiaries Tab */}
          <TouchableOpacity
            className={`p-3 px-5 rounded-full ${
              activeTab === "Beneficiaries" ? "bg-blue-100" : ""
            }`}
            onPress={() => setActiveTab("Beneficiaries")}
          >
            <Text
              className={`${
                activeTab === "Beneficiaries" ? "text-primary" : "text-gray-500"
              }`}
            >
              Beneficiaries
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-56 p-5 bg-white top-3 rounded-xl">
          <Text>Recent Recipent</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  predefinedAmounts: {
    justifyContent: "flex-start",
    alignItems: "center",
    color: "rgba(144, 144, 144, 1)",
  },
  amountButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "rgba(170, 170, 170, 0.5)",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginRight: 10,
    minWidth: 70,
    height: 40,
    width: 96,
    shadowColor: "rgba(15, 15, 16, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  amountText: {
    fontSize: 12,
    fontFamily: "Aeonik TRIAL",
    textAlign: "center",
    color: "rgba(31, 108, 171, 1)",
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
    bottom: 100,
    left: 20,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  schedulePayment: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switch: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  paymentText: {
    fontWeight: "medium",
    fontFamily: "Aeonik TRIAL",
    color: "#000",
    fontSize: 14,
  },

  selectedOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  selectedText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  dropdownArrow: {
    width: 14,
    height: 14,
    tintColor: "#555",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  radioIcon: {
    width: 20,
    height: 20,
    tintColor: "green", // Color when selected
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  dropdown: {
    position: "absolute",
    top: -40,
    width: "100%",
    backgroundColor: "#ffffff",
    zIndex: 50,
    borderRadius: 10,
    // Shadow for iOS
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5,
  },
  userIcon: {
    paddingLeft: 120,
  },
});
