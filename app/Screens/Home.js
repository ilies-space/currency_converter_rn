import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../theme/Colors';

export default function Home() {
  // Colors used
  const mainColor = Colors.mainColor;
  const lightColor = Colors.light;
  //utility
  const [input, setinput] = useState(10);
  const [convertFrom, setconvertFrom] = useState('DZD');

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
        {/* Main View  */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mainColor,
            flex: 1,
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
                keyboardType={'decimal-pad'}
                style={{
                  color: 'white',
                  fontSize: 35,
                  borderBottomWidth: 2,
                  borderColor: 'white',
                  padding: 15,
                }}
                value={input.toString()}
                onChangeText={(inputValue) => {
                  setinput(inputValue);
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
                <Picker.Item label="Euro" value="Euro" />
                <Picker.Item label="Dollar" value="Dollar" />
              </Picker>
            </View>
          </View>

          {/* swap button  */}
          <View
            style={{
              position: 'absolute',
              bottom: -20,
              right: 20,
              elevation: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: lightColor,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text>T L</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
