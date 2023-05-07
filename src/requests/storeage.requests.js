import {AsyncStorage} from 'react-native';

const retrieveData = async () => {
  try {
      AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              // get at each store's key/value so you can work with it
              let key = store[i][0];
              let value = store[i][1];
            });
          });
        });
  } catch (error) {
    // Error retrieving data
  }
};

const removeData = async (input, output , roman , LanuageValue) => {
  try {
    await AsyncStorage.removeItem(input+""+output+""+roman+""+LanuageValue);
} catch (error) {
  console.log(error)
}
}

const storeData = async (input, output, roman, LanuageValue) => {
try {
    await AsyncStorage.setItem(input+""+output+""+roman+""+LanuageValue, JSON.stringify({input,output,roman, LanuageValue}));
} catch (error) {
    console.log(error)
}
};

export {
    retrieveData,
    storeData,
    removeData,
}