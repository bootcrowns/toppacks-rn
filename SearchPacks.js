import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from "react-native";

class SearchPacks extends React.Component {
  constructor() {
    super();
    this.state = {
      str: ""
    };
  }

  handleChange = event => {
    this.setState({ str: event.target.value });
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ marginTop: 20, fontSize: 30, fontWeight: "5em" }}>
          Search Repositories
        </Text>
        <TextInput
          value={this.state.searchQuery}
          clearTextOnFocus="true"
          placeholder={"Search Git Repositories"}
          onChangeText={searchQuery => this.setState({ searchQuery })}
        />
        <Button title="Get" onPress={() => alert("Success")} />
      </View>
    );
  };
}