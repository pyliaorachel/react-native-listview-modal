"use strict";

import React, { PropTypes, Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const noop = () => {};
const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});

class ListviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(this.props.listArray),
      listArray: this.props.listArray,
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  handleClick(data) {
    console.log('handleClick', data);
    this.props.onClick(data);
    this.props.onClose();
  }
  renderRow(rowData) {
    const separatorStyle = this.props.separatorStyle;
    const rowTextStyle = this.props.rowText;
    const rowStyle = this.props.rowStyle;

    let separator = <View style={separatorStyle}/>;

    let row = (
      <View style={rowStyle}>
        <Text style={rowTextStyle}>{rowData}</Text>
      </View>
    );

    if (this.props.renderRow) {
      row = this.props.renderRow(rowData);
    }

    return (
      <View>
        <TouchableOpacity onPress={() => this.handleClick(rowData)}>
          {row}
        </TouchableOpacity>
        {separator}
      </View>
    );
  }
  renderList() {
    const listViewStyle = this.props.listViewStyle || DefaultStyles.listView;
    return (
      <ListView
        style={listViewStyle}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.renderRow(rowData)}
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
      />
    );
  }
  render() {
    const containerStyle = this.props.containerStyle;
    const topBarStyle = this.props.topBarStyle;
    const iconContainerStyle = this.props.iconContainerStyle;
    const closeIconButtonStyle = this.props.closeIconButtonStyle;
    const titleStyle = this.props.titleStyle;
    const title = this.props.title;

    return (
      <TouchableOpacity onPress={this.props.onClose}>
        <View style={containerStyle}>
          <View style={topBarStyle}>
            <View style={iconContainerStyle} />
            <Text style={titleStyle}>{title}</Text>
            <TouchableOpacity style={iconContainerStyle} onPress={()=> this.props.onClose()}>
              <Image source={require('./icon/icon_close.png')} style={closeIconButtonStyle}/>
            </TouchableOpacity>
          </View>
          {this.renderList()}
        </View>
      </TouchableOpacity>
    );
  }
};

class ListviewModalBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      popoverIsOpen: false,
    }

    this.onClick = this.onClick.bind(this);
  }
  onClick(data){
    console.log('selected data:', data);
  }
  render() {
    const onClick = this.props.onClick || this.onClick;
    return (
      <View>
        <TouchableHighlight style={this.props.btnStyle} onPress={() => this.setState({popoverIsOpen: true})}>
          <Text>{this.props.btnText}</Text>
        </TouchableHighlight>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.popoverIsOpen}
          onRequestClose={() => {console.log("Modal has been closed.")}}
        >
          <View>
            <ListviewModal
              listArray={this.props.listArray}
              title={this.props.title}
              onClick={onClick}
              onClose={() => this.setState({popoverIsOpen: false})}
              containerStyle={this.props.containerStyle}
              listViewStyle={this.props.listViewStyle}
              separatorStyle={this.props.separatorStyle}
              topBarStyle={this.props.topBarStyle}
              titleStyle={this.props.titleStyle}
              iconContainerStyle={this.props.iconContainerStyle}
              closeIconButtonStyle={this.props.closeIconButtonStyle}
              rowTextStyle={this.props.rowTextStyle}
              rowStyle={this.props.rowStyle}
            />
          </View>
        </Modal>
      </View>
    );
  }
}


const DefaultStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  listView: {
    height: SCREEN_HEIGHT-60,
    width: SCREEN_WIDTH,
    backgroundColor: 'white'
  },
  separator: {
    height: 0.5,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: '#CCC',
  },
  topBar: {
    paddingTop: 10,
    height: 60,
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  title: {
    flex: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    flex: 1,
  },
  closeIconButton: {
    width: 30,
    height: 30,
    paddingRight: 10,
    backgroundColor: 'transparent',
  },
  rowText: {
    marginLeft: 10,
    fontWeight: '300',
  },
  row: {
    flexDirection: 'row',
    padding: 15,
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

ListviewModal.propTypes = {
  listArray: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  containerStyle: View.propTypes.style,
  listViewStyle: View.propTypes.style,
  separatorStyle: View.propTypes.style,
  topBarStyle: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  iconContainerStyle: View.propTypes.style,
  closeIconButtonStyle: Image.propTypes.style,
  rowTextStyle: Text.propTypes.style,
  rowStyle: View.propTypes.style,
};
ListviewModal.defaultProps = {
  listArray: [],
  onClick: noop,
  onClose: noop,
  title: '',
  containerStyle: DefaultStyles.container,
  listViewStyle: DefaultStyles.listView,
  separatorStyle: DefaultStyles.separator,
  topBarStyle: DefaultStyles.topBar,
  titleStyle: DefaultStyles.title,
  iconContainerStyle: DefaultStyles.iconContainer,
  closeIconButtonStyle: DefaultStyles.closeIconButton,
  rowTextStyle: DefaultStyles.rowText,
  rowStyle: DefaultStyles.row,
};

ListviewModalBtn.propTypes = Object.assign({}, ListviewModal.propTypes, {
  btnStyle: View.propTypes.style,
  btnText: PropTypes.string,
});
ListviewModalBtn.defaultProps = Object.assign({}, ListviewModal.defaultProps, {
  onClick: null,
  btnStyle: DefaultStyles.btn,
  btnText: 'Select',
});

module.exports = {
  ListviewModal,
  ListviewModalBtn,
};
