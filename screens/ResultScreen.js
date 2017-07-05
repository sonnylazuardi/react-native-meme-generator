import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  ActivityIndicator,
  CameraRoll,
  Alert,
} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
export default class ResultScreen extends React.Component {
  state = {
    loaded: false
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.showResult && nextProps.showResult) {
      this.setState({loaded: false});
    }
  }
  onSaveImage = () => {
    var uri = this.refs.memeImage.props.source.uri;
    console.log(uri);
    CameraRoll.saveToCameraRoll(uri, 'photo');
    Alert.alert('Photo Saved', 'Photo has been saved in Camera Roll');
  }
  render() {
    const {top, bottom, meme, showResult} = this.props;
    const {loaded} = this.state;
    if (!showResult) return null;
    console.log(`http://memegen.link/${meme}/${top}/${bottom}.jpg`);
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {!loaded ? <ActivityIndicator /> : null}
          <Image
            ref="memeImage"
            source={{uri: `http://memegen.link/${meme}/${top}/${bottom}.jpg`}}
            resizeMode={'contain'}
            style={{width: deviceWidth, height: deviceWidth}}
            onLoad={() => this.setState({loaded: true})} />
        </View>
        {loaded ?
          <TouchableOpacity onPress={this.onSaveImage}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>💾 Save</Text>
            </View>
          </TouchableOpacity>
          : null}
        <TouchableOpacity onPress={() => this.props.onToggleResult()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>💩 Generate Again</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  button: {
    margin: 10,
    backgroundColor: '#01afee',
    padding: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
