// import React, { useState, useEffect } from 'react'
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native'
// import CrossButton from '../../components/cross_button';
// import Colors from '../../consts/colors'
// import axios from 'axios'
// import LanguagesHook from '../../hooks/language.hook';
// import Tts from 'react-native-tts';
// import SpeechToText from '../../components/speech_to_text'
// import Speaker from '../../assets/images/home/speaker.svg'
// import Mute from '../../assets/images/home/black-box.svg'
// import {removeData, storeData} from '../../requests/storeage.requests'
// import AddFavorite from '../../components/add_favorite'
// import { useNavigation } from '@react-navigation/native';
// import {
//     favorited,
//     removeFavorite,
// } from '../../consts/messages'

// const {darkPurple} = Colors;

// const TranslateView = (props) => {

//     const navigation = useNavigation ();
//     const {useLanguageState} = LanguagesHook();
//     const {input_value, output_value} = useLanguageState();

//     const [input, setInput] = useState("");
//     const [output, setOutput] = useState("");

//     const [isPlaying, setPlaying] = useState("")

//     const play = (type) => {
//         Tts.stop()
//         if(type === "input"){
//             Tts.setDefaultLanguage(input_value)
//             setPlaying(type)
//             Tts.speak(input)
//         }else {
//             Tts.setDefaultLanguage(output_value)
//             setPlaying(type)
//             Tts.speak(output)
//         }
//     }

//     Tts.addEventListener('tts-finish', () => setPlaying(""));
//     Tts.removeEventListener('tts-finish');

//     //requests will be seperated later. They will not stay at a component
//     const request = (text, lang) => {
//         return axios.post(
//             'https://libretranslate.de/translate',{
//                 q: text,
//                 source: input_value,
//                 target: output_value            }
//         // `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200418T170345Z.bc1a7bbbbe797646.b3a4b85d9ec55c9b821be6462380cde319272af8&text=${text}&lang=${lang || input_value}-${output_value}`,
//         ).then(result => {
//             console.log(result);
//             setOutput(result.data.translatedText)
//         }).catch(e => {});
//     };
//     const detectRequest = (text) => {
//         return axios.get(
//         `https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20200418T170345Z.bc1a7bbbbe797646.b3a4b85d9ec55c9b821be6462380cde319272af8&text=${text}`,
//         ).then(result => {
//             request(text, result.data.lang)
//         }).catch(e => {});
//     }

//     useEffect(() => {
//         input_value !== "detect" ?
//         request(input) : detectRequest(input);
//     }, [input, input_value, output_value])

//     useEffect(() => {
//         if(input.length === 0 && output.length !== 0)
//             setOutput("")
//     })

//     const favoriteEvent = () => {
//         favorited();
//         storeData(input, output);
//     }
//     const removeFavoriteEvent = () => {
//         removeFavorite();
//         removeData(input, output);
//     }

//     return (

//         <View style={styles.container}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={styles.inputView}>
//                     <TextInput
//                         multiline={true}
//                         placeholder="Type Something"
//                         onChangeText={text => setInput(text)}
//                         value={input}
//                         style={styles.input}
//                     />
//                     {
//                         input?.length > 0 ? (
//                         <View>
//                             <CrossButton onClick={setInput}/>
//                             <TouchableOpacity style={styles.speaker} onPress={() => play("input")}>
//                                 {isPlaying !== "input" ?
//                                     <Speaker width={16} height={16} fill="black"/>
//                                     :
//                                     <Mute width={12} height={12} fill="black"/>
//                                 }
//                             </TouchableOpacity>
//                         </View>
//                         )
//                         : null
//                     }
//                 </View>

//                 <View style={styles.line}/>

//                 <View style={styles.outputView}>
//                     <Text style={styles.output}>{output || "Waiting for your input..."}</Text>
//                     {
//                         output?.length > 0 ? (
//                         <View >
//                             <TouchableOpacity style={styles.speaker} onPress={() => play("output")}>
//                                 {isPlaying !== "output" ?
//                                     <Speaker width={16} height={16} fill="black"/>
//                                     :
//                                     <Mute width={12} height={12} fill="black"/>
//                                 }
//                             </TouchableOpacity>
//                             <AddFavorite set={favoriteEvent} remove={removeFavoriteEvent}/>
//                         </View>
//                         )
//                         : null
//                     }
//                 </View>
//                 <View style={styles.outputView}>

//                     <Text style={styles.output}>{output}Roman tranlation...</Text>
//                 </View>
//             </ScrollView>

//             {/* <SpeechToText language={input_value} setInput={setInput}/> */}
//             <Button title='next' onPress={()=>navigation.navigate('SpeachScreen' , {params : output , input_value : input_value , input : input})}></Button>
//         </View>

//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       height: '100%',
//       flex: 1,
//       margin: 15,
//       backgroundColor: 'transparent',
//     },
//     line: {
//         borderBottomColor: 'black',
//         borderBottomWidth: 1,
//         opacity: 0.1,
//         marginTop: 10,
//     },
//     inputView: {
//         flex: 0,
//         flexDirection: 'row',
//     },
//     input: {
//         fontSize: 24,
//         paddingBottom: 48,
//         width: "90%",
//     },
//     outputView: {
//         flex: 0,
//         flexDirection: 'row',
//         marginTop: 20,
//     },
//     output: {
//         fontSize: 24,
//         paddingBottom: 48,//         marginLeft: 4,
//         marginRight: -4,
//         width: "90%",
//         color: darkPurple,
//     },
//     speaker: {
//         width: 44,
//         height: 44,
//         padding: 10,
//         marginTop: 10,
//     },
//   });

// export default TranslateView








import {View, Text, TextInput, Image , StyleSheet, TouchableOpacity , ScrollView} from 'react-native';
import {useState} from 'react';
import React from 'react';
import { useEffect } from 'react';
import {removeData, storeData} from '../../requests/storeage.requests'
import DropDownPicker from 'react-native-dropdown-picker';

import { useNavigation } from '@react-navigation/native';
 import AddFavorite from '../../components/add_favorite';
 import {
    favorited,
    removeFavorite,
} from '../../consts/messages'
 import languages from '../../consts/languages';
const translateView = (route) => {
  const navigation = useNavigation();
  const [inputL1, setInputL1] = useState('');
  const [inputL2, setInputL2] = useState('');
  const [inputL3, setInputL3] = useState('');
  const [input, setInput] = useState('');


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(languages);


  const L1  = route?.route?.params?.L1;
  const L2  = route?.route?.params?.L2;
  const L3  = route?.route?.params?.L3;
  const LanuageValue = route?.route?.params?.LanuageValue;

console.log('routeee', route);

    const favoriteEvent = () => {
      console.log(value);
        favorited();
        storeData(inputL1, inputL2, inputL3, value );
    }
    const removeFavoriteEvent = () => {
        removeFavorite();
        removeData(inputL1, inputL2, inputL3, value);
    }


    console.log('ss',L1 , L2 , L3);
    useEffect(() => {
      
        setInputL1(L1 ? L1 : '');
    setInputL2(L2 ? L2 : '');
    setInputL3(L3 ? L3 : '');
    setValue(LanuageValue ?LanuageValue : [])
   
    }, [L1, L2, L3])
  return (
    <ScrollView contentContainerStyle = {{flexGrow  :1 , alignContent : 'center' , alignItems :"center"}}>
      <Text style = {{fontSize  :20 , fontWeight : '600', marginBottom : 20}} >Add phrase</Text>
      <Text style = {styles.text} >Language</Text>
      <View style = {{marginHorizontal  :20}}>     
         <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style = {{borderColor : '#D4D4D2'}}
        dropDownContainerStyle={{borderColor : '#D4D4D2'}}
        maxHeight={400}

        // theme="LIGHT"
        // multiple={true}
        // mode="BADGE" 
        // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />

     </View> 

      <Text style = {styles.text} >L1 Subtitle</Text>
      <TextInput
        multiline={true}
        onChangeText={text => setInputL1(text)}
        value={inputL1}
        placeholder="Enter text in selected language"

        style ={styles.input}
      />
         { 
         inputL1.length  > 0 && inputL2.length > 0 &&
         
         <AddFavorite set={favoriteEvent} remove={removeFavoriteEvent} />

}
      <Text style = {styles.text} >L2 Subtitle</Text>
      <TextInput
        multiline={true}
        onChangeText={text => setInputL2(text)}
        value={inputL2}
        placeholder="Enter text in English"

        style ={styles.input}

      />

      <Text style = {styles.text} >L3 Subtitle</Text>
      <TextInput
        multiline={true}
        onChangeText={text => setInputL3(text)}
        value={inputL3}
        placeholder="Enter text in Roman"

        style ={styles.input}

      />
<TouchableOpacity     style={{  position: 'relative', marginVertical:30}} onPress={()=>navigation.navigate('SpeachScreen' , { Language : value , inputL1 : inputL1 , inputL2 : inputL2 , inputL3 : inputL3})} >

      <Image
      source={require('../../assets/images/mice.png')}
  
      />
      </TouchableOpacity>

    </ScrollView>
  );
};
const styles = StyleSheet.create({

input :{

    borderWidth : 1,
    width : ('90%'),
    backgroundColor : '#F9F9F9',
    borderColor : '#D4D4D2'
},
text :{
    fontSize  :20,
    fontWeight : '600',
    marginTop: 20

}


})
export default translateView;
