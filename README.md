# React Native ListviewModal

Modified from [react-native-list-popover](https://github.com/bulenttastan/react-native-list-popover).

The main aim for creating this branch is not for PR but to update the out-dated __react-native-list-popover__ and for other developers to take reference from this example.

```<ListviewModal/>``` - a popover modal of list

```<ListviewModalBtn/>``` - an all-in-one btn for showing & hiding ListviewModal

## Added, Modified, & Removed Features from _react-native-list-popover_

1. Use [Modal](https://facebook.github.io/react-native/docs/modal.html) to show & hide popover
2. Full-screen popover by default
3. Remove __isVisible__ property from ListPopover component. Use __visible__ property from Modal to show & hide popover instead.

The main properties to send from the parent component:
* `listArray` array of items to choose from
* `onClick` callback function that takes a `data` parameter to handle the click operation
* `onClose` callback function to set the visible of Modal to false to close the popover

## Usage

Inside your RN project:

1. Copy the ListviewModal.js file to your desired destination.
2. Make a reference to your ListviewModal.js module, and start using it happily.

## Example

<img src="https://github.com/pyliaorachel/react-native-listview-modal/blob/master/ListviewModal.gif" alt="Sample" width="280" height="510" />

Please refer to [Example/index.ios.js](https://github.com/pyliaorachel/react-native-listview-modal/blob/master/Example/index.ios.js) for the complete code.

```javascript

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

```
