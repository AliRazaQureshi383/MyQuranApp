import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import SpeechToText from '../components/speech_to_text';
import {useState} from 'react';
import Voice from '@react-native-community/voice';
import Microphone from '../assets/images/home/microphone.svg';
import languages from '../consts/languages';
import DropDownPicker from 'react-native-dropdown-picker';
import {AsyncStorage} from 'react-native';
import { favorited } from '../consts/messages';

const SpeachScreen = props => {
  const Language = props.route.params.Language;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(Language);
  const [items, setItems] = useState([
    {
      value: 'es',
      icon: () => (
        <Image
          source={require('../assets/images/spain.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'de',
      icon: () => (
        <Image
          source={require('../assets/images/germany.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'ur',
      icon: () => (
        <Image
          source={require('../assets/images/pakistan.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'ru',
      icon: () => (
        <Image
          source={require('../assets/images/russia.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'ja',
      icon: () => (
        <Image
          source={require('../assets/images/japan.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'ar',
      icon: () => (
        <Image
          source={require('../assets/images/saudi-arabia.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'fr',
      icon: () => (
        <Image
          source={require('../assets/images/france.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'zh',
      icon: () => (
        <Image
          source={require('../assets/images/china.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'pt',
      icon: () => (
        <Image
          source={require('../assets/images/turkey.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      value: 'mi',
      icon: () => (
        <Image
          source={require('../assets/images/new-zealand.png')}
          style={{height: 30, width: 30}}
        />
      ),
    },
  ]);

  const [counter, setCounter] = useState(0);
  const shuffle = array => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  let flagLanguage = '';

  const [input, setInput] = useState('');
  const [inputL1 , setInputL1]= useState(props.route.params.inputL1)
  const [inputL2 , setInputL2]= useState(props.route.params.inputL2)
  const [inputL3 , setInputL3]= useState(props.route.params.inputL3)

// console.log('try',inputL1,inputL2,inputL3);
  const inputL11 = props.route.params.inputL1;
  const inputL22 = props.route.params.inputL2;
  const inputL33 = props.route.params.inputL3;
const [splitInput1 , setsplitInput1]= useState(inputL1?.split(' '));
const [splitInput3 , setsplitInput3]= useState(inputL3?.split(' '));



  const splitInput11 = inputL11.split(' ');
  const splitInput33 = inputL33?.split(' ');
  const [repeatDashes, setRepeatDashes] = useState(inputL1?.split(' ').length);

  const[shuffleArray ,setShuffleArray] = useState(0)
  const length = repeatDashes;
  const dashes = '__ ';
  const DashesArry = Array(length).fill(dashes);

  const [Data , setData] =useState(
    
    splitInput1 && splitInput3 &&
    
    [
    {
      lan: splitInput1[0],
      roman: splitInput3[0],
    },
    {
      lan: splitInput1[1],
      roman: splitInput3[1],
    },

    {
      lan: splitInput1[2],
      roman: splitInput3[2],
    },
    // {
    //   lan: splitInput1[3],
    //   roman: splitInput3[3],
    // },
    // {
    //   lan: splitInput1[4],
    //   roman: splitInput3[4],
    // },
    // {
    //   lan: splitInput1[5],
    //   roman: splitInput3[5],
    // },
    // {
    //   lan: splitInput1[6],
    //   roman: splitInput3[6],
    // },
    // {
    //   lan: splitInput1[7],
    //   roman: splitInput3[7],
    // },
    // {
    //   lan: splitInput1[8],
    //   roman: splitInput3[8],
    // },
    // {
    //   lan: splitInput1[9],
    //   roman: splitInput3[9],
    // },
  ])

  const [shownText, setShownText] = useState(inputL1);
  const [guessText, setGuessText] = useState(DashesArry);
const [fvrtArray ,setFavrtArray] = useState ([])
  const [hint, setHint] = useState(false);
  console.log('input', input);
  console.log('text lenghth', inputL1.split(' ').length);
  useEffect(() => {
    const onSpeechResults = e => {
      let value = e.value[0];
      let value2 = value.charAt(0).toUpperCase() + value.slice(1);
      console.log('sssa', value2);
      setInput(value2);
    };
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoice = async () => {
    try {
      await Voice.start(value);
    } catch (e) {
      console.error(e);
    }
  };

  const finalResult = input => {
    let inputWithSpace = ' ' + input + ' ';
    console.log('input new', input);
    let goahed =  splitInput1 ?(splitInput1) : ( splitInput11);
    const length = filteredNumbers[0] && ((filteredNumbers[0]?.input)?.split(' ')) ; 
    length.indexOf(input) > -1 &&
      // splitInput1 ? splitInput1.indexOf(input) > -1 :splitInput11.indexOf(input) > -1 
    guessText.splice(goahed?.indexOf(input), 1, `${inputWithSpace}`);
    console.log('maybe done', guessText);

    // filteredNumbers[0] && setGuessText(DashesArry)
  };

  const hintComparison = lan => {
    let inputWithSpace = ' ' + lan + ' ';
    console.log('input new', lan);
    let goahed =  splitInput1 ?(splitInput1) : ( splitInput11);
    let abc = guessText.splice(  goahed?.indexOf(lan), 1,`${inputWithSpace}`,
    );
    console.log('maybe done2', guessText);
    setInput(abc);
  };


console.log('',counter);

const [allFavData , setAllFavData] = useState([])

const retrieveData = async () => {
  try {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log('dddd +++', value);
          setAllFavData(data => [...data, value]);
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
console.log('s------ss++',guessText);

{allFavData.map(item => {
  var obj = JSON.parse(item);


let  data =  {
  
   input : obj.input,
   output : obj.output,
    roman :obj.roman,
   language : obj.LanuageValue}
  
  fvrtArray.push(data)
  // obj.LanuageValue == 'ur' &&  urdu.push(obj)
  // console.log('w',urdu);
  return (
    <>
    </>
  );
})}
console.log('fvrtArray',fvrtArray);
console.log('value',value);
const filteredNumbers = fvrtArray.filter(num => num.language == value );
console.log('new', filteredNumbers[0]);

useEffect(() => {
console.log('mmm',filteredNumbers[0]?.input,filteredNumbers[0]?.output,filteredNumbers[0]?.roman);
  open && 
  // const changePhrase =()=>{
    setInputL1(filteredNumbers[0]?.input)
    setInputL2(filteredNumbers[0]?.output)
    setInputL3(filteredNumbers[0]?.roman)
    const splitInput1 = filteredNumbers[0]?.input.split(' ');
    const splitInput3 = filteredNumbers[0]?.roman.split(' ');
    filteredNumbers[0] &&
    setData(
      [{
        lan: splitInput1[0],
        roman: splitInput3[0],
      },
      {
        lan: splitInput1[1],
        roman: splitInput3[1],
      },
  
      {
        lan: splitInput1[2],
        roman: splitInput3[2],
      },]
    )
  // }
            
  // setRepeatDashes((filteredNumbers[0]?.input)?.split(' ').length);

  const length = filteredNumbers[0] ? ((filteredNumbers[0]?.input)?.split(' ').length) : splitInput11.length;
  const dashes = '__ ';
  const DashesArry = Array(length).fill(dashes);
  setGuessText(DashesArry)
setsplitInput1(splitInput1)
setsplitInput3(splitInput3)
setCounter(0)
setInput('');


}, [value])
// changePhrase();






  return (
    <ScrollView style={{flexGrow: 1, marginHorizontal: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginHorizontal: 2}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{borderColor: '#D4D4D2'}}
            dropDownContainerStyle={{borderColor: '#D4D4D2'}}
            maxHeight={400}
            containerStyle={{width: 100, marginTop: 50}}
            // theme="LIGHT"
            // multiple={true}
            // mode="BADGE"
            // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
          />
        </View>
        {/* <Image
          source={
            Language == 'es'
              ? require('../assets/images/spain.png')
              : Language == 'de'
              ? require('../assets/images/germany.png')
              : Language == 'ur'
              ? require('../assets/images/pakistan.png')
              : Language == 'ja'
              ? require('../assets/images/japan.png')
              : Language == 'ar'
              ? require('../assets/images/saudi-arabia.png')
              : Language == 'fr'
              ? require('../assets/images/france.png')
              : Language == 'zh'
              ? require('../assets/images/china.png')
              : Language == 'pt'
              ? require('../assets/images/portugal.png')
              : Language == 'mi'
              ? require('../assets/images/new-zealand.png')
              : require('../assets/images/united-states.png')
          }
          style={{height: 30, width: 30, marginHorizontal: 10, marginTop: 50}}
        /> */}
        <TouchableOpacity
          onPress={() => {
  
            setShuffleArray(shuffleArray + 1)
  

            // setHint(true);
            // setCounter(counter) 

          }}>
          <Image
            source={require('../assets/images/msgIcon.png')}
            style={{height: 30, width: 30, marginHorizontal: 10, marginTop: 50}}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 50, marginLeft: 10}}>
        {(input == shownText) || (input == filteredNumbers[0]?.input) ?  (
          <Text style={{color: 'red', fontSize: 30, alignSelf: 'center'}}>
            {input && input}{' '}
          </Text>
        ) : (splitInput1?.indexOf(input) > -1 || splitInput11.indexOf(input) > -1)  ? (

          (finalResult(input),
         
          
          
          (
            <Text style={{color: 'red', fontSize: 30, alignSelf: 'center'}}>
              {guessText}
            </Text>
          ))
        ) 
        : (
          <Text style={{fontSize: 50, fontWeight: 'bold', alignSelf: 'center'}}>
            {guessText}
            
          </Text>
        )
        }
      </View>
   <Text style={{alignSelf: 'center',marginTop: 50}}>{ input ? ( inputL3 ?? inputL33) : ''}</Text>
      <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 30,marginTop: 50}}>
        {inputL2 ?? inputL22}{' '}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setHint(true);
          setCounter(counter + 1)
          setShuffleArray(0)

        }}
        style={{alignSelf: 'center', marginTop: 50}}>
        <Image source={require('../assets/images/searchIcon.png')} />
      </TouchableOpacity>

      {/* <View style={{marginTop: 230, padding: 10}} /> */}
      <TouchableOpacity style={styles.touchable} onPress={() => startVoice()}>
        <Microphone width={24} height={24} fill="white" />
      </TouchableOpacity>

      {hint && (
        <View style={{flexDirection: 'row'}}>
          {
          
        shuffleArray ? shuffle(Data)?.slice(0 ,counter)?.map(e => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  hintComparison(e.lan)

                }}>
                <View
                  style={{
                    backgroundColor: 'black',
                    marginVertical: 10,
                    padding: 10,
                  }}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    {e.lan}
                  </Text>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    {e.roman}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }

        )         
        
        
        
        : Data?.slice(0, counter)?.map(e => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    hintComparison(e.lan);
                  }}>
                  <View
                    style={{
                      backgroundColor: 'black',
                      marginVertical: 10,
                      padding: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      {e.lan}
                    </Text>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      {e.roman}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }

          )         
          
          
          }
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  touchable: {
    // position: 'absolute',
    // bottom: 60,
    marginTop: 50,
    marginBottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    height: 60,
    width: 60,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.41,
    shadowRadius: 11.11,

    elevation: 24,
  },
});
export default SpeachScreen;
