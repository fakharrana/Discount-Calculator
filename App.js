import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  ScrollView,
} from "react-native";

const App = () => {
  const [getOriginalPrice, setOriginalPrice] = useState(null);
  const [getDiscountPercentage, setDiscountPercentage] = useState(null);
  const [getYouSaved, setYouSaved] = useState("You Saved");
  const [getFinalPrice, setFinalPrice] = useState("Final Price");
  const [getDataAdded, setDataAdded] = useState(false);
  const [getModalVisible, setModalVisible] = useState(false);
  const [getList, setList] = useState([]);

  const saveList = () => {
    if (getDataAdded === true) {
      const temp = getList;
      temp.push({
        originalPrice: getOriginalPrice,
        discountPercentage: getDiscountPercentage,
        finalPrice: getFinalPrice,
      });

      setList(temp);
      setOriginalPrice(null);
      setDiscountPercentage(null);
      setYouSaved("You Saved");
      setFinalPrice("Final Price");
      setDataAdded(false);

      alert("Price List successfully saved.");
    } else {
      alert("Please add some data first.");
    }
  };

  const update = () => {
    const youSaved = (getOriginalPrice * getDiscountPercentage) / 100;
    const finalPrice = getOriginalPrice - youSaved;

    if (getDiscountPercentage > 100) {
      alert("Discount cannot be more than 100%");
      setDiscountPercentage(null);
    } else if (getDiscountPercentage < 0) {
      alert("Discount cannot be less than 0%");
      setDiscountPercentage(null);
    } else if (getOriginalPrice < 0) {
      alert("Price cannot be less than 0");
      setOriginalPrice(null);
    } else if (getOriginalPrice != null && getDiscountPercentage != null) {
      setYouSaved(youSaved);
      setFinalPrice(finalPrice);
      setDataAdded(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 40,
          fontSize: 30,
          fontWeight: "bold",
          color: "red",
        }}
      >
        DISCOUNT CALCULATOR
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={{
            fontWeight: "bold",
            height: 40,
            marginRight: 20,
            width: 150,
            textAlign: "center",
            borderColor: "gray",
            borderWidth: 2,
            borderRadius: 25,
            color: "red",
          }}
          placeholderTextColor="green"
          value={getOriginalPrice}
          placeholder="Original Price"
          keyboardType="number-pad"
          onChangeText={(originalPrice) => setOriginalPrice(originalPrice)}
          onEndEditing={update}
        />
        <TextInput
          style={{
            fontWeight: "bold",
            height: 40,
            width: 150,
            textAlign: "center",
            borderColor: "gray",
            borderWidth: 2,
            borderRadius: 25,
            color: "red",
          }}
          placeholderTextColor="green"
          value={getDiscountPercentage}
          placeholder="Discount Percentage"
          keyboardType="number-pad"
          onChangeText={(discountPercentage) =>
            setDiscountPercentage(discountPercentage)
          }
          onEndEditing={update}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            height: 40,
            marginRight: 20,
            width: 150,
            textAlign: "center",
            paddingTop: 11,
            borderColor: "gray",
            borderWidth: 2,
            borderRadius: 25,
            color: "red",
          }}
        >
          {getYouSaved}{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            height: 40,
            width: 150,
            textAlign: "center",
            paddingTop: 11,
            borderColor: "gray",
            borderWidth: 2,
            borderRadius: 25,
            color: "red",
          }}
        >
          {" "}
          {getFinalPrice}{" "}
        </Text>
      </View>

      <View style={{ marginTop: "10%" }}>
        <TouchableWithoutFeedback onPress={saveList}>
          <Text
            style={{
              fontWeight: "bold",
              height: 40,
              width: 150,
              textAlign: "center",
              paddingTop: 11,
              borderColor: "lightseagreen",
              borderRadius: 25,
              color: "white",
              backgroundColor: "lightseagreen",
            }}
          >
            Save
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={getModalVisible}
      >
        <View style={styles.modalView}>
          <View style={{ justifyContent: "center", marginTop: "10%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  marginRight: "5%",
                  fontWeight: "bold",
                }}
              >
                Original Price
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  marginRight: "4%",
                  fontWeight: "bold",
                }}
              >
                - Discount
              </Text>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                = Final Price
              </Text>
            </View>

            <ScrollView>
              {getList.map((item, index) => (
                <View
                  key={index.toString}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      marginRight: "4%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {item.originalPrice}
                  </Text>
                  <Text
                    style={{
                      fontSize: 19,
                      marginRight: "3%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {item.discountPercentage}
                  </Text>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {item.finalPrice}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={{ marginTop: "4%" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  height: 40,
                  width: 150,
                  textAlign: "center",
                  paddingTop: 11,
                  borderColor: "lightseagreen",
                  borderRadius: 25,
                  color: "white",
                  backgroundColor: "lightseagreen",
                }}
              >
                Close
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>

      <View style={{ marginTop: "4%" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              height: 40,
              width: 150,
              textAlign: "center",
              paddingTop: 11,
              borderColor: "lightseagreen",
              borderRadius: 25,
              color: "white",
              backgroundColor: "lightseagreen",
            }}
          >
            View History
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  modalView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
});

export default App;
