import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../theme/Colors';

export default function Home() {
  // Colors used
  const mainColor = Colors.mainColor;
  const lightColor = Colors.light;
  //utility
  const [convertFrom, setconvertFrom] = useState('EUR');
  const [convertTo, setconvertTo] = useState('DZD');
  const [input, setinput] = useState(10);
  const [result, setresult] = useState(0);

  function getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();

    // get month Name
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[month] + ' ' + date + ',' + year;
  }

  var from_to = convertFrom + '_' + convertTo;
  var API_KEY = '8431c148e217d19f195a';
  // GET KEY FROM  : https://free.currencyconverterapi.com
  // test convert
  const [isFetching, setisFetching] = useState(false);

  // console.log(convertFrom + '_' + convertTo);
  // console.log(15 * input);
  return (
    <View style={{flex: 1}}>
      {/* TOP VIEW */}
      <View style={{backgroundColor: mainColor, flex: 1}}>
        {/* header  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 12,
          }}>
          {/* curret date */}
          <Text style={{color: lightColor}}> {getCurrentDate()} </Text>
          {/* hamburger icon  */}
          <TouchableOpacity>
            <View
              style={{
                height: 2.5,
                backgroundColor: lightColor,
                width: 35,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                height: 2.5,
                backgroundColor: lightColor,
                width: 25,
                borderRadius: 10,
                marginVertical: 8,
              }}
            />
            <View
              style={{
                height: 2.5,
                backgroundColor: lightColor,
                width: 15,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Main View  1*/}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mainColor,
            flex: 1,
            zIndex: 0,
          }}>
          {/* INPUT AREA  */}
          <View
            style={{
              flexDirection: 'row',
              height: 80,
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '35%',
              }}>
              <TextInput
                // editable={!isFetching}
                keyboardType={'decimal-pad'}
                style={{
                  color: 'white',
                  fontSize: 40,
                  borderBottomWidth: 2,
                  borderColor: 'white',
                  padding: 15,
                }}
                // value={input.toString()}
                // onChangeText={(inputValue) => {
                //   setinput(inputValue);

                // }}
                onSubmitEditing={(inputValue) => {
                  var amount = inputValue.nativeEvent.text;
                  console.log({amount});
                  if (amount !== 0 && amount !== '') {
                    setisFetching(true);
                    fetch(
                      'https://free.currconv.com/api/v7/convert?q=' +
                        from_to +
                        '&compact=ultra&apiKey=' +
                        API_KEY,
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.status === 400) {
                          alert(data.error);
                          setisFetching(false);
                        } else {
                          setresult(data);
                          console.log(from_to);

                          setresult(Object.values(data)[0] * amount);
                          console.log({result});
                          setisFetching(false);
                        }
                      });
                  }
                }}
              />
            </View>
            {/* change currency picker */}
            <View style={{width: '15%'}}>
              <Picker
                mode={'dropdown'}
                selectedValue={convertFrom}
                style={{
                  height: 50,
                  width: 100,
                  color: lightColor,
                }}
                dropdownIconColor={'white'}
                onValueChange={(itemValue) => setconvertFrom(itemValue)}>
                <Picker.Item label="DZD" value="DZD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="USD" value="USD" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Main View  2*/}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: lightColor,
            flex: 1,
            zIndex: 0,
          }}>
          {/* Result AREA  */}
          <View
            style={{
              flexDirection: 'row',
              height: 80,
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '64%',
              }}>
              <TextInput
                editable={false}
                keyboardType={'decimal-pad'}
                style={{
                  color: mainColor,
                  fontSize: 20,
                  borderBottomWidth: 2,
                  borderColor: mainColor,
                  padding: 15,
                }}
                value={result.toString()}
                onChangeText={(inputValue) => {
                  setresult(inputValue);
                }}
              />
            </View>
            {/* change currency picker */}
            <View style={{width: '15%'}}>
              <Picker
                mode={'dropdown'}
                selectedValue={convertTo}
                style={{
                  height: 50,
                  width: 100,
                  color: mainColor,
                }}
                dropdownIconColor={mainColor}
                onValueChange={(itemValue) => setconvertTo(itemValue)}>
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="DZD" value="DZD" />
                <Picker.Item label="EUR" value="EUR" />
              </Picker>
            </View>
          </View>
        </View>
      </View>
      {/* swap button  */}

      <View style={{position: 'absolute', bottom: '42%', right: '45%'}}>
        {isFetching ? (
          <View
            style={{
              backgroundColor: lightColor,
              elevation: 20,
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            }}>
            <ActivityIndicator size="large" color={mainColor} />
          </View>
        ) : (
          <View />
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: '42%',
          right: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: lightColor,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            elevation: 10,
          }}>
          <Text style={{fontSize: 40, color: mainColor}}>↑↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
