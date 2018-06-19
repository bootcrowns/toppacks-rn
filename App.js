/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  FlatList,
  ListItem
} from "react-native";
// import SearchPacks from "SearchPacks";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      repoData: [""],
      pageNo: 1
    };
  }


  getRepoData = async searchQuery => {
    var newurl = `https://api.github.com/search/repositories?q=${searchQuery}`;
    await fetch(newurl)
      .then(response => response.json())
      .then(data => {
        this.setState({ repoData: data.items });
      });
  };

  flatOnEndReached = () => {
    this.setState({ pageNo: this.state.pageNo++ });
  };

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Search Repositories
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.searchQuery}
            clearTextOnFocus={true}
            placeholder={"Search Git Repositories"}
            onChangeText={searchQuery => this.setState({ searchQuery })}
          />

          <Button
            title="Get"
            onPress={() => this.getRepoData(this.state.searchQuery)}
          />
        </View>
        <View style={styles.displayRepos}>
          <View style={{ flex: 1 }}>
            <FlatList
              keyExtractor={(item, index) => toString(item.id)}
              data={this.state.repoData}
              style={styles.displayRepos}
              onEndReached={this.flatOnEndReached}
              onEndReachedThreshold={0.3}
              extraData={this.state}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      height: 50,
                      backgroundColor: "#3bbbbb",
                      borderRadius: 2,
                      marginTop: 2,
                      alignItems: "baseline",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ flex: 3 }}> {item.name} </Text>

                    <Button
                      style={{ flex: 1, alignSelf: "flex-end" }}
                      onPress={() => {
                        1;
                      }}
                      title="import"
                    >
                      Import
                    </Button>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  input: {
    fontSize: 20,
    textAlign: "left",
    marginTop: 5
  },
  searchBar: {
    flex: 1
  },
  displayRepos: {
    flex: 5,
    marginTop: 20
  },
  item: {
    backgroundColor: "#1F243F",
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    height: Dimensions.get("window").width / 4
  },
  itemText: {
    color: "#fff",
    fontSize: 30
  }
});
