import React,{useState} from 'react';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  View,
} from 'react-native';

const RemoveButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={() => props.onPress()}>
      <Text style={styles.removeButton}>Remove</Text>
    </TouchableOpacity>
  );
};

const HistoryComponent = ({ navigation, route }) => {
  const [getList,setList]=useState(route.params.dataList)

  
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => clearList()}
        disabled={getList.length <= 0}>
        <Text
          style={
            getList.length <= 0
              ? styles.clearButtonDisabled
              : styles.clearButtonEnabled
          }>
          Clear
        </Text>
      </TouchableOpacity>
    ),

     headerLeft: () => (
      <View style={{ paddingLeft: 10 }}>
        <Ionicons
          name="arrow-back"
          size={32}
          color="white"
          onPress={() =>
            navigation.navigate('Home', { returnDataList: getList })
          }
        />
      </View>
    ),
  });

  const clearList = () => {
    Alert.alert('Are You Sure???', 'Press Yes To Clear History', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => setList([]),
      },
    ]);
  };

  const remove = (itemKey) => {
    setList( getList.filter((item) => item.key != itemKey) );
    alert('Removed  Successfully');
  };

  const dataTable = (
    <DataTable style={{ marginTop: 10 }}>
      <DataTable.Header>
        <DataTable.Title>
          <Text style={styles.tableHeader}>Original Price</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text style={styles.tableHeader}>Discount</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text style={styles.tableHeader}>Final Price</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text style={styles.tableHeader}>Remove</Text>
        </DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        {getList.map((item, index) => (
          <DataTable.Row>
            <DataTable.Cell>{item.originalPrice}</DataTable.Cell>
            <DataTable.Cell numeric>{item.discountPercentage}%
            </DataTable.Cell>
            <DataTable.Cell numeric>{item.finalPrice}</DataTable.Cell>
            <DataTable.Cell numeric>
              <RemoveButton onPress={() => remove(item.key)} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </ScrollView>
    </DataTable>
  );

  const emptyTable = (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 30, color: 'green', marginTop: '60%' }}>
        History is Empty!!!
      </Text>
    </View>
  );

  return (
    <View>{getList.length <= 0 ? emptyTable : dataTable}</View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  removeButton: {
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    borderWidth: 3,
    borderColor: 'red',
    padding: 4,
    borderRadius: 18,
    backgroundColor: 'red',
  },
  clearButtonDisabled: {
    width: '100%',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 13,
    borderWidth: 3,
    borderColor: 'grey',
    paddingLeft: 10,
    padding: 4,
    marginRight: 10,
    borderRadius: 18,
    backgroundColor: 'grey',
  },
  clearButtonEnabled: {
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
});
export default HistoryComponent;
