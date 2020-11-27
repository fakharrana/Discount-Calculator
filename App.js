import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

    <View style={{ flexDirection:"row" , justifyContent: "space-between"}}> 
      <TextInput
      style={{ height: 40 ,marginRight:20 , width:150,  textAlign:"center", borderColor: 'gray', borderWidth: 1 }}
      placeholder="Original Price"
      keyboardType="number-pad"
    />
      <TextInput
      style={{ height: 40,width:150, textAlign:"center", borderColor: 'gray', borderWidth: 1 }}
      placeholder="Discount Percentage"
    />
      <StatusBar style="auto" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
