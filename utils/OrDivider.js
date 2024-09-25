import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>OR</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    marginVertical: 20,
    width: "70%"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C4C4C4',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#C4C4C4',
  },
});

export default OrDivider;
