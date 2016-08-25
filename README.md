# React-Native List Popover

Modified from [react-native-list-popover](https://github.com/bulenttastan/react-native-list-popover).

The main aim for creating this branch is not for PR but to update the out-dated __react-native-list-popover__ and for other developers to take reference from this example.

```<ListPopover/>``` - a popover of list

```<ListPopoverBtn/>``` - an all-in-one btn for showing & hiding ListPopover

## Added, Modified, & Removed Features

1. Use [Modal](https://facebook.github.io/react-native/docs/modal.html) to show & hide ListPopover
2. Full-screen ListPopover by default
3. Remove __isVisible__ property from ListPopover component. Use __visible__ property from Modal to show & hide ListPopover instead.

The main properties to send from the parent component:
* `listArray` array of items to choose from
* `onClick` callback function that takes a `data` parameter to handle the click operation
* `onClose` callback function to set the visible of Modal to false to close the popover

## Usage

Inside your RN project:

1. Copy the ListPopover.js file to your desired destination.
2. Install packages

  ```
  npm install --save react-native-vector-icons
  rnpm link
  ```
  
  ```rnpm link``` is for linking [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) for the close icon.
3. Make a reference to your ListPopover.js module, and start using it happily.

## Example

![](https://github.com/pyliaorachel/react-native-list-popover/blob/list-popover-btn/ListPopover.gif)

Please refer to [Example/index.ios.js](https://github.com/pyliaorachel/react-native-list-popover/blob/list-popover-btn/Example/index.ios.js) for the complete code.

```javascript

<View style={styles.container}>
  <TouchableHighlight style={styles.btn} onPress={() => this.setState({popoverIsOpen: true})}>
    <Text>ListPopover</Text>
  </TouchableHighlight>
  <Modal
    animationType={"slide"}
    transparent={false}
    visible={this.state.popoverIsOpen}
    onRequestClose={() => {console.log("Modal has been closed.")}}
  >
    <View>
      <ListPopover
        listArray={this.state.listArray}
        title='ListPopover'
        onClick={this.onClick}
        onClose={() => this.setState({popoverIsOpen: false})}
      />
    </View>
  </Modal>

  <ListPopoverBtn
    listArray={this.state.listArray}
    title='ListPopoverBtn'
    btnText='ListPopoverBtn'
    onClick={this.onClick}
  />

  <Text>{this.state.data}</Text>
</View>

```
