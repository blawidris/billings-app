import React, { useState, useRef, useEffect } from "react";
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
import Toast from "react-native-toast-message";

export default function DataPurchase() {
  const [bottomSheetType, setBottomSheetType] = useState("saveBeneficiary");

  const [options, setOptions] = useState([]);

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
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [showBundleDropdown, setShowBundleDropdown] = useState(false);

  const [bundles, setBundle] = useState([]);
  const [otp, setOTP] = useState(["", "", "", ""]);

  const [billerId, setBillerId] = useState("");

  const getOperators = async () => {
    try {
      const response = await axios.get(
        `${host}/vtpass/operators?data=tv-subscription`
      );

      // console.log(response.data);
      setOptions(response.data.data);
    } catch (error) {
      console.log(error.data);
      Toast.show({ type: "error", text1: "An occurred getting operators" });
    }
  };

  const getDataVariations = async (serviceID) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const myHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      setIsLoading(true);

      const response = await axios.get(
        `${host}/vtpass/variations?data=${serviceID}`,

        {
          headers: myHeaders,
        }
      );

      console.log(response.data.data.varations[0]);
      setBundle(response.data.data.varations);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const myHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      setIsLoading(true);

      const data = {
        amount: parseFloat(selectedBundle.variation_amount) ?? 0,
        variation_code: selectedBundle.variation_code,
        phone: amount,
        serviceID: selectedOption.serviceID,
        pin: Number(otp.join("")),
        billersCode: amount,
      };

      console.log(data);

      const response = await axios.post(`${host}/vtpass/purchase-cable`, data, {
        headers: myHeaders,
      });

      if (response.status == 201) {
        router.push("/data_success");
      }

      console.log(response.data);
    } catch (error) {
      router.push("/data_error");
      console.log(error.response);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = async (option) => {
    setSelectedOption(option);
    setShowDropdown(false);

    await getDataVariations(option.serviceID);
  };
  const handleBeneficiary = () => {
    //navigation.navigate("Beneficiary");
  };
  const handleUserIconPress = async () => {
    // navigation.navigate("PhoneBook");
    // console.log('permissionStatus', permissionStatus)
    // if (permissionStatus === null) {
    //   const { status } = await Contacts.requestPermissionsAsync();
    //   setPermissionStatus(status);
    // }
    // if (permissionStatus === "granted") {
    //   const { data } = await Contacts.getContactsAsync({
    //     fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    //   });
    //   if (data.length > 0) {
    //     dispatch(setContacts(data));
    //     console.log('Iwokr ')
    //     navigation.navigate('PhoneBook')
    //   } else {
    //     Alert.alert("No contacts found");
    //   }
    // } else {
    //   Alert.alert(
    //     "Permission to access contacts was denied. Please enable it in your settings.",
    //   );
    // }
  };

  const bottomSheetRef = useRef(null);

  const toggleSwitch = (type) => {
    if (type === "schedule") {
      setIsScheduledEnabled((previousState) => !previousState);
    } else {
      setIsSavedEnabled((previousState) => !previousState);
    }
  };

  useEffect(() => {
    //getDataVariations();
    getOperators();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cable</Text>
      </View>

      <View style={styles.amountContainer}>
        <View style={{ marginBottom: 20 }}>
          <View style={[styles.inputContainer, { marginBottom: 0 }]}>
            <TouchableOpacity
              style={styles.selectedOption}
              className="flex-1 w-full"
              onPress={() => setShowDropdown(!showDropdown)}
            >
              {selectedOption?.image ? (
                <Image
                  source={{ uri: selectedOption.image }}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("@/assets/airtel.png")}
                  style={styles.icon}
                />
              )}
              <Text style={styles.selectedText}>{selectedOption?.name}</Text>
              <Image
                source={require("@/assets/icons/caret-down.png")}
                style={styles.dropdownArrow}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Biller ID"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Dropdown List */}
        {showDropdown && (
          <View>
            <FlatList
              style={styles.dropdown}
              data={options}
              keyExtractor={(item) => item.serviceID}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex flex-row items-center justify-between p-4"
                  onPress={() => handleSelect(item)}
                >
                  <View className="flex flex-row items-center space-x-4">
                    {item?.image ? (
                      <Image source={{ uri: item.image }} style={styles.icon} />
                    ) : (
                      <Image
                        source={require("@/assets/airtel.png")}
                        style={styles.icon}
                      />
                    )}
                    <Text style={styles.optionText}>{item.name}</Text>
                  </View>
                  {item?.serviceID === selectedOption?.serviceID ? (
                    <View style={styles.radioUnselected} />
                  ) : (
                    <View style={styles.radioUnselected} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Bundle Selection */}
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={[styles.inputContainer, styles.bundleSelector]}
            onPress={() => setShowBundleDropdown(!showBundleDropdown)}
          >
            <Text style={styles.selectedText}>
              {selectedBundle ? selectedBundle.name : "Choose Bundle"}
            </Text>
            <Ionicons
              name={showBundleDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="rgba(31, 108, 171, 1)"
            />
          </TouchableOpacity>

          {showBundleDropdown && (
            <FlatList
              style={styles.dropdown}
              data={bundles}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelectedBundle(item);
                    setShowBundleDropdown(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View style={styles.schedulePayment}>
          <Text style={styles.paymentText}>Save Benefiaciary</Text>
          <Switch
            value={isSavedEnabled}
            onValueChange={() => toggleSwitch("saved")}
            disabled={false}
            activeText={""}
            inActiveText={""}
            circleSize={30}
            barHeight={30}
            circleBorderWidth={0}
            backgroundActive={"rgba(31, 108, 171, 1)"}
            backgroundInactive={"#E9E9EA"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2.5}
            switchRightPx={2.5}
            switchWidthMultiplier={2}
            switchBorderRadius={35}
          />
        </View>
        <View style={[styles.schedulePayment, { marginTop: 30 }]}>
          <Text style={styles.paymentText}>Schedule Payment</Text>
          <Switch
            style={styles.switch}
            value={isScheduledEnabled}
            onValueChange={() => toggleSwitch("schedule")}
            disabled={false}
            activeText={""}
            inActiveText={""}
            circleSize={30}
            barHeight={30}
            circleBorderWidth={0}
            backgroundActive={"rgba(31, 108, 171, 1)"}
            backgroundInactive={"#E9E9EA"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2.5}
            switchRightPx={2.5}
            switchWidthMultiplier={2}
            switchBorderRadius={35}
          />
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            setIsPayNow(true);
          }}
        >
          <Text style={styles.payButtonText}>Proceed</Text>
        </TouchableOpacity>
        <View className="h-[70px]"></View>
      </View>

      <View>
        <TextInput placeholder="Biller's Code" />
      </View>

      {isSavedEnabled && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSavedEnabled}
          onRequestClose={() => setIsSavedEnabled(false)}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(31, 108, 171, 0.4)" }}>
            <CustomBottomSheet
              ref={bottomSheetRef}
              type={bottomSheetType}
              amount={amount}
              phoneNumber={phoneNumber}
              snapPoints="40%"
              onClose={() => setIsSavedEnabled(false)}
            />
          </View>
        </Modal>
      )}
      {isPayNow && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPayNow}
          onRequestClose={() => setIsPayNow(false)}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(31, 108, 171, 0.4)" }}>
            <CustomBottomSheet
              ref={bottomSheetRef}
              type={"schedulePayment"}
              amount={selectedBundle.variation_amount}
              phoneNumber={phoneNumber}
              selectedOption={selectedOption}
              sub={"Data"}
              handlePress={() => {
                setIsPayNow(false);
                setIsEnterPassword(true);
              }}
              snapPoints="55%"
              onClose={() => setIsPayNow(false)}
            />
          </View>
        </Modal>
      )}
      {isEnterPassword && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEnterPassword}
          onRequestClose={() => setIsEnterPassword(false)}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(31, 108, 171, 0.4)" }}>
            <CustomBottomSheet
              ref={bottomSheetRef}
              type={"enterPassword"}
              otp={otp}
              setOTP={setOTP}
              snapPoints="40%"
              isLoading={isLoading}
              handlePress={() => handlePayment()}
              onClose={() => setIsEnterPassword(false)}
            />
          </View>
        </Modal>
      )}
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
    bottom: 80,
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
    backgroundColor: "#fff",
    zIndex: 10,
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5,
  },
  userIcon: {
    paddingLeft: 120,
  },
  bundleSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#fff",
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
