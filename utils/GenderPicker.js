import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { FooterText } from "@/components/account.styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const GenderPicker = ({ selectedValue, onValueChange, items }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handlePress = (itemValue) => {
    onValueChange(itemValue);
    setPickerVisible(false);
  };

  return (
    <View style={styles.picker}>
      <TouchableOpacity onPress={() => setPickerVisible(true)}>
        <FooterText>{selectedValue}</FooterText>
        <FontAwesome
          name="chevron-down"
          size={14}
          color="rgba(196, 196, 196, 1)"
          style={{ position: "absolute", right: 10 }}
        />
      </TouchableOpacity>
      <Modal
        transparent
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setPickerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handlePress(item.value)}
                >
                  <FooterText>{item.label}</FooterText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "rgba(196, 196, 196, 1)",
    borderRadius: 10,
    justifyContent: "center",
    height: 48,
    paddingLeft: 10,
    position: "relative",
  },
  datePicker: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "rgba(196, 196, 196, 1)",
    borderRadius: 10,
    justifyContent: "center",
    height: 48,
    paddingLeft: 10,
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  modalItem: {
    padding: 15,
  },
});

export default GenderPicker;
