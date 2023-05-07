import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import Colors from '../../consts/colors';
import {removeData, storeData} from '../../requests/storeage.requests';
import {useNavigation} from '@react-navigation/native';
import {favorited, removeFavorite} from '../../consts/messages';
const FavoriedView = () => {
const [urdu , setUrdu] = useState([])
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const retrieveData = async () => {
    try {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            console.log('dddd', value);
            setData(data => [...data, value]);
          });
        });
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  console.log(data);
  return (
    <View style={{height: '100%'}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {data.map(item => {
          var obj = JSON.parse(item);
          console.log(
            'dddddddd',
            obj.input,
            obj.output,
            obj.roman,
            obj.LanuageValue,
          );

          obj.LanuageValue == 'ur' &&  urdu.push(obj)
          console.log('w',urdu);
          return (
            <View
              key={obj.input}
              style={[
                styles.words,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search', {
                    L1: obj.input,
                    L2: obj.output,
                    L3: obj.roman,
                    LanuageValue: obj.LanuageValue,
                  });
                }}>
                <View>
                  <Text style={styles.input}>{obj.input}</Text>
                  <Text style={styles.output}>{obj.output}</Text>
                  <Text style={styles.output}>{obj.roman}</Text>
                  <Image
                    source={
                      obj.LanuageValue == 'es'
                        ? require('../../assets/images/spain.png')
                        : obj.LanuageValue == 'de'
                        ? require('../../assets/images/germany.png')
                        : obj.LanuageValue == 'ur'
                        ? require('../../assets/images/pakistan.png')
                        : obj.LanuageValue == 'ja'
                        ? require('../../assets/images/japan.png')
                        : obj.LanuageValue == 'ar'
                        ? require('../../assets/images/saudi-arabia.png')
                        : obj.LanuageValue == 'fr'
                        ? require('../../assets/images/france.png')
                        : obj.LanuageValue == 'zh'
                        ? require('../../assets/images/china.png')
                        : obj.LanuageValue == 'pt'
                        ? require('../../assets/images/portugal.png')
                        : obj.LanuageValue == 'mi'
                        ? require('../../assets/images/new-zealand.png')
                        : ''
                    }
                    style={{height: 30, width: 30, marginHorizontal: 10}}
                  />

                  <View style={styles.line} />
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    removeFavorite();
                    removeData(
                      obj.input,
                      obj.output,
                      obj.roman,
                      obj.LanuageValue,
                    );
                    // navigation.goBack();
                    setData([]);
                    retrieveData();
                  }}>
                  <Image
                    style={{height: 20, width: 20, alignSelf: 'center'}}
                    source={require('../../assets/images/close.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  words: {
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
  },
  output: {
    fontSize: 20,
    color: Colors.darkPurple,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    opacity: 0.1,
    marginTop: 10,
  },
});

export default FavoriedView;
