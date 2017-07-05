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
} from 'react-native';

import MasonryList from '@appandflow/masonry-list';
import ResultScreen from './ResultScreen';

const deviceWidth = Dimensions.get('window').width;
const widthHalves = deviceWidth/3;

const MEMES = ['tenguy', 'afraid', 'older', 'aag', 'tried', 'biw', 'stew', 'blb', 'kermit', 'bd', 'ch', 'cbg', 'wonka', 'cb', 'keanu', 'dsm', 'live', 'ants', 'doge', 'alwaysonbeat', 'ermg', 'facepalm', 'firsttry', 'fwp', 'fa', 'fbf', 'fmr', 'fry', 'ggg', 'hipster', 'icanhas', 'crazypills', 'mw', 'noidea', 'regret', 'boat', 'hagrid', 'sohappy', 'captain', 'bender', 'inigo', 'iw', 'ackbar', 'happening', 'joker', 'ive', 'll', 'away', 'morpheus', 'mb', 'badchoice', 'mmm', 'jetpack', 'imsorry', 'red', 'mordor', 'oprah', 'oag', 'remembers', 'philosoraptor', 'jw', 'patrick', 'rollsafe', 'sad-obama', 'sad-clinton', 'sadfrog', 'sad-bush', 'sad-biden', 'sad-boehner', 'saltbae', 'sarcasticbear', 'dwight', 'sb', 'ss', 'sf', 'dodgson', 'money', 'snek', 'sohot', 'nice', 'awesome', 'awesome', 'awkward', 'awkward', 'fetch', 'success', 'scc', 'ski', 'officespace', 'interesting', 'toohigh', 'bs', 'fine', 'sparta', 'center', 'both', 'winter', 'xy', 'buzz', 'yodawg', 'yuno', 'yallgot', 'bad', 'elf', 'chosen'];

const MEMELIST = MEMES.map((meme, i) => ({id: i, meme}));

export default class HomeScreen extends React.Component {
  state = {
    top: '',
    bottom: '',
    memes: MEMELIST,
    activeMeme: 'tenguy',
    showResult: false,
  };
  onChangeActiveMeme(activeMeme) {
    this.setState({
      activeMeme
    });
  }
  onToggleResult = () => {
    this.setState({
      showResult: !this.state.showResult,
    });
  }
  onShowResult = () => {
    this.setState({
      showResult: true,
    });
  }
  processText = (input) => {
    return input.replace('_', '__').replace('-', '--').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s').replace('\"', '\'\'').replace(' ', '_');
  }
  render() {
    const {top, bottom, memes, activeMeme, showResult} = this.state;
    return (
      <View style={styles.container}>
        <View style={{height: 50}}>
          <Image source={require('../assets/images/header.png')} resizeMode={'contain'} style={{width: null, height: null, flex: 1}}/>
        </View>
        <TextInput style={styles.input} value={top} onChangeText={(top) => this.setState({top})} placeholder={'Input top text here'} />
        <TextInput style={styles.input} value={bottom} onChangeText={(bottom) => this.setState({bottom})} placeholder={'Input bottom text here'} />
        <View style={{flex: 1}}>
          <MasonryList
            data={memes}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={this.onChangeActiveMeme.bind(this, item.meme)}>
                  <View style={styles.memeBlock}>
                    <Image source={{uri: `http://memegen.link/${item.meme}/_.jpg?preview=true&height=50`}} style={styles.memeImage}/>
                    {activeMeme == item.meme ?
                      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderWidth: 5, borderColor: '#ff0'}} />
                      : null}
                  </View>
                </TouchableOpacity>
              );
            }}
            getHeightForItem={({item}) => widthHalves}
            numColumns={3}
            keyExtractor={meme => meme.id}
          />
        </View>
        <TouchableOpacity onPress={this.onShowResult}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>🐶 Generate</Text>
          </View>
        </TouchableOpacity>
        <ResultScreen
          top={this.processText(top)}
          bottom={this.processText(bottom)}
          meme={activeMeme}
          showResult={showResult}
          onToggleResult={this.onToggleResult}/>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#01afee',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  memesContainer: {
    flex: 1,
    backgroundColor: '#ff0',
  },
  memeGrid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  memeBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthHalves,
    height: widthHalves,
  },
  memeImage: {
    width: widthHalves,
    height: widthHalves,
  },
});
