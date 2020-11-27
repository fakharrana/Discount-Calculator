import React from "react";
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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      originalPrice: null,
      discountPercentage: null,
      youSaved: "You Saved",
      finalPrice: "Final Price",
      dataAdded: false,
      modalVisible: false,
      list: [],
    };
  }

  saveList = () => {
    if (this.state.dataAdded === true) {
      const temp = this.state.list;
      temp.push({
        originalPrice: this.state.originalPrice,
        discountPercentage: this.state.discountPercentage,
        finalPrice: this.state.finalPrice,
      });
      this.setState({
        list: temp,
        originalPrice: null,
        discountPercentage: null,
        youSaved: " You Saved",
        finalPrice: "Final Price",
        dataAdded: false,
      });

      alert("Price List successfully saved.");
    } else {
      alert("Please add some data first.");
    }
  };

  update = () => {
    const youSaved =
      (this.state.originalPrice * this.state.discountPercentage) / 100;
    const finalPrice = this.state.originalPrice - youSaved;

    if (this.state.discountPercentage > 100) {
      alert("Discount cannot be more than 100%");
      this.setState({
        discountPercentage: null,
      });
    } else if (this.state.discountPercentage < 0) {
      alert("Discount cannot be less than 0%");
      this.setState({
        discountPercentage: null,
      });
    } else if (this.state.originalPrice < 0) {
      alert("Price cannot be less than 0");
      this.setState({
        originalPrice: null,
      });
    } else if (
      this.state.originalPrice != null &&
      this.state.discountPercentage != null
    ) {
      this.setState({
        youSaved: youSaved,
        finalPrice: finalPrice,
        dataAdded: true,
      });
    }
  };

  render() {
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
            value={this.state.originalPrice}
            placeholder="Original Price"
            keyboardType="number-pad"
            onChangeText={(originalPrice) => this.setState({ originalPrice })}
            onEndEditing={this.update}
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
            value={this.state.discountPercentage}
            placeholder="Discount Percentage"
            keyboardType="number-pad"
            onChangeText={(discountPercentage) =>
              this.setState({ discountPercentage })
            }
            onEndEditing={this.update}
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
            {this.state.youSaved}{" "}
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
            {this.state.finalPrice}{" "}
          </Text>
        </View>

        <View style={{ marginTop: "10%" }}>
          <TouchableWithoutFeedback onPress={this.saveList}>
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
          visible={this.state.modalVisible}
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
                {this.state.list.map((item, index) => (
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
                  this.setState({ modalVisible: false });
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
              this.setState({ modalVisible: true });
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
  }
}

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
