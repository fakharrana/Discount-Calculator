import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      originalPrice: null,
      discountPercentage: null,
      youSaved: null,
      finalPrice: null,
    };
  }

  update = () => {
    const youSaved =
      (this.state.originalPrice * this.state.discountPercentage) / 100;
    const finalPrice = this.state.originalPrice - youSaved;

    if (
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            style={{
              height: 40,
              marginRight: 20,
              width: 150,
              textAlign: 'center',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            value={this.state.originalPrice}
            placeholder="Original Price"
            keyboardType="number-pad"
            onChangeText={(originalPrice) => this.setState({ originalPrice })}
            onEndEditing={this.update}
          />
          <TextInput
            style={{
              height: 40,
              width: 150,
              textAlign: 'center',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            value={this.state.discountPercentage}
            placeholder="Discount Percentage"
            keyboardType="number-pad"
            onChangeText={(discountPercentage) =>
              this.setState({ discountPercentage })
            }
            onEndEditing={this.update}
          />
        </View>

        <View style={{ marginTop: 8 }}>
          <Text>You Saved : {this.state.youSaved}</Text>
          <Text>Final Price : {this.state.finalPrice}</Text>
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
  },
});
