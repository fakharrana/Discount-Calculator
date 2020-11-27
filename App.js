import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      originalPrice: null,
      discountPercentage: null,
      youSaved: "You Saved",
      finalPrice: "Final Price",
    };
  }

  update = () => {
    const youSaved =
      (this.state.originalPrice * this.state.discountPercentage) / 100;
    const finalPrice = this.state.originalPrice - youSaved;

    if (this.state.discountPercentage > 100) {
      alert("Discount cannot be more than 100%")
      this.setState({
        discountPercentage: null,
      });
    }
    else if (this.state.discountPercentage < 0) {
      alert("Discount cannot be less than 0%")
      this.setState({
        discountPercentage: null,
      });
    }
    else if (this.state.originalPrice < 0) {
      alert("Price cannot be less than 0")
      this.setState({
        originalPrice: null,
      });

    }
    else if (
      this.state.originalPrice != null &&
      this.state.discountPercentage != null
    ) {
      this.setState({
        youSaved: youSaved,
        finalPrice: finalPrice,
        originalPrice: null,
        discountPercentage: null,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Text style={{ marginBottom: 40, fontSize: 30, fontWeight: "bold", color: "red" }}>DISCOUNT CALCULATOR</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            style={{
              fontWeight: "bold",
              height: 40,
              marginRight: 20,
              width: 150,
              textAlign: 'center',
              borderColor: 'gray',
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
              textAlign: 'center',
              borderColor: 'gray',
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



        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <Text
            style={{
              fontWeight: "bold",
              height: 40,
              marginRight: 20,
              width: 150,
              textAlign: 'center',
              paddingTop: 11,
              borderColor: 'gray',
              borderWidth: 2,
              borderRadius: 25,
              color: "red",
            }}
          >{this.state.youSaved} </Text>
          <Text
            style={{
              fontWeight: "bold",
              height: 40,
              width: 150,
              textAlign: 'center',
              paddingTop: 11,
              borderColor: 'gray',
              borderWidth: 2,
              borderRadius: 25,
              color: "red",
            }}
          > {this.state.finalPrice} </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
});
