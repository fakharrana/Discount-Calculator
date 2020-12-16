import React, { useState ,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

const DiscountCalculatorComponent = ({ navigation , route }) => {
  const [getOriginalPrice, setOriginalPrice] = useState(null);
  const [getDiscountPercentage, setDiscountPercentage] = useState(null);
  const [getYouSaved, setYouSaved] = useState('You Saved');
  const [getFinalPrice, setFinalPrice] = useState('Final Price');
  const [getDataAdded, setDataAdded] = useState(false);
  const [getModalVisible, setModalVisible] = useState(false);
  const [getList, setList] = useState([]);

  useEffect(() => {
    // When returning from History Screen Update state
    if (route.params?.returnDataList) {
      setList(route.params.returnDataList);
    }
  });

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => navigation.navigate('History', { dataList: getList })}>
        <Text style={styles.historyButton}>History</Text>
      </TouchableOpacity>
    ),
  });

  const saveList = () => {
    if (getDataAdded === true) {
      const temp = getList;
      temp.push({
        key: Math.random().toString(),
        originalPrice: getOriginalPrice,
        discountPercentage: getDiscountPercentage,
        finalPrice: getFinalPrice,
      });

      setList(temp);
      setOriginalPrice(null);
      setDiscountPercentage(null);
      setYouSaved('You Saved');
      setFinalPrice('Final Price');
      setDataAdded(false);

      alert('Successfully saved to the list.');
    } else {
      alert('Please Press TICK/DONE First For Calculation');
    }
  };

 const validateOriginalPrice = (text) => {
    if (text < 0) {
      alert('Price cannot be less than 0');
      setOriginalPrice(null);
    } else if (text === '') {
      setOriginalPrice(null);
    } else {
      setOriginalPrice(text);
    }
  };

  const validateDiscountPercentage = (text) => {
    if (text < 0) {
      alert('Discount cannot be less than 0%');
      setDiscountPercentage(null);
    } else if (text > 100) {
      alert('Discount cannot be more than 100%');
      setDiscountPercentage(null);
    } else if (text === '') {
      setDiscountPercentage(null);
    } else {
      setDiscountPercentage(text);
    }
  };


  const calculate = () => {
    const youSaved = ((getOriginalPrice * getDiscountPercentage) / 100).toFixed(
      2
    );
    const finalPrice = (getOriginalPrice - youSaved).toFixed(2);
    if (getOriginalPrice != null && getDiscountPercentage != null) {
      setYouSaved(youSaved);
      setFinalPrice(finalPrice);
      setDataAdded(true);
    } else {
      alert("Please fill both input fields.");
      setYouSaved('You Saved');
      setFinalPrice('Final Price');
      setDataAdded( false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={{
            marginTop: -40,
            fontWeight: 'bold',
            height: 50,
            marginRight: 20,
            width: 150,
            textAlign: 'center',
            borderColor: 'gray',
            borderWidth: 2,
            borderRadius: 25,
            color: 'red',
          }}
          placeholderTextColor="green"
          value={getOriginalPrice}
          placeholder="Original Price"
          keyboardType="number-pad"
          onChangeText={(text) => validateOriginalPrice(text)}
          onSubmitEditing={calculate}
        />
        <TextInput
          style={{
            marginTop: -40,
            fontWeight: 'bold',
            height: 50,
            width: 150,
            textAlign: 'center',
            borderColor: 'gray',
            borderWidth: 2,
            borderRadius: 25,
            color: 'red',
          }}
          placeholderTextColor="green"
          value={getDiscountPercentage}
          placeholder="Discount Percentage"
          keyboardType="number-pad"
          onChangeText={(text) => validateDiscountPercentage(text)}
          onSubmitEditing={calculate}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 25,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            height: 50,
            marginRight: 20,
            width: 150,
            textAlign: 'center',
            paddingTop: 12,
            borderColor: 'gray',
            borderWidth: 2,
            borderRadius: 25,
            color: 'red',
          }}>
          {getYouSaved}{' '}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            height: 50,
            width: 150,
            textAlign: 'center',
            paddingTop: 12,
            borderColor: 'gray',
            borderWidth: 2,
            borderRadius: 25,
            color: 'red',
          }}>
          {' '}
          {getFinalPrice}{' '}
        </Text>
      </View>

      <View style={{ marginTop: '10%' }}>
        <TouchableOpacity
          onPress={saveList}
          disabled={
            getOriginalPrice === null && getDiscountPercentage === null
          }>
          <Text
            style={
              getOriginalPrice === null && getDiscountPercentage === null
                ? styles.buttonDisabled
                : styles.buttonEnabled
            }>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyButton: {
    width: '100%',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 13,
    borderWidth: 3,
    borderColor: 'white',
    paddingLeft: 10,
    padding: 4,
    marginRight: 10,
    borderRadius: 18,
    backgroundColor: 'white',
  },
  buttonEnabled: {
    fontWeight: 'bold',
    height: 50,
    width: 150,
    textAlign: 'center',
    paddingTop: 13,
    borderColor: 'green',
    borderRadius: 25,
    color: 'white',
    backgroundColor: 'green',
  },
  buttonDisabled: {
    fontWeight: 'bold',
    height: 50,
    width: 150,
    textAlign: 'center',
    paddingTop: 13,
    borderColor: 'green',
    borderRadius: 25,
    color: 'white',
    backgroundColor: 'grey',
  },
});

export default DiscountCalculatorComponent;