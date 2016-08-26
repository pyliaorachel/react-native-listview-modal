/**
 * Sample ListviewModal
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
} from 'react-native';
import { ListviewModal, ListviewModalBtn } from './ListviewModal';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArray: [],
      popoverIsOpen: false,
      data: 'Nothing Selected',
    };

    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    const listArray = [
      'C',
      'C++',
      'Java',
      'JavaScript',
      'Python',
      'Ruby',
    ];
    this.setState({
      listArray,
    });
  }
  onClick(data) {
    console.log('selected data:', data);
    this.setState({
      data,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.btn} onPress={() => this.setState({popoverIsOpen: true})}>
          <Text>ListviewModal</Text>
        </TouchableHighlight>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.popoverIsOpen}
          onRequestClose={() => {console.log("Modal has been closed.")}}
        >
          <View>
            <ListviewModal
              listArray={this.state.listArray}
              title='ListviewModal'
              onClick={this.onClick}
              onClose={() => this.setState({popoverIsOpen: false})}
            />
          </View>
        </Modal>

        <ListviewModalBtn
          listArray={this.state.listArray}
          title='ListviewModalBtn'
          btnText='ListviewModalBtn'
          onClick={this.onClick}
        />

        <Text>{this.state.data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btn: {
    padding: 5,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#444444',
    margin: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
