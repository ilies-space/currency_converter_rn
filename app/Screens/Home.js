import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../theme/Colors';
import {currencies} from '../data/currencies';
import {convertAmount} from '../functions/currencyConverter';
import {getNetworkStatu} from '../functions/NetworkState';

export default function Home() {
  // Colors used
  const mainColor = Colors.mainColor;
  const lightColor = Colors.light;
  //utility
  const [convertFrom, setconvertFrom] = useState('DZD');
  const [convertTo, setconvertTo] = useState('EUR');
  const [input, setinput] = useState(1);
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

  const [flagFrom, setflagFrom] = useState(currencies[0].flagURL);
  const [flagto, setflagto] = useState(currencies[2].flagURL);

  const [from_to, setfrom_to] = useState(convertFrom + '_' + convertTo);
  // GET KEY FROM  : https://free.currencyconverterapi.com
  // test convert
  const [isFetching, setisFetching] = useState(false);

  const netState = getNetworkStatu();

  // handle UPDATE or SWAP
  useEffect(() => {
    // alert('');
    if (input !== 0 && input !== '') {
      convertAmount(from_to, input, setisFetching, setresult);
    }
    console.log('update me !!');
  }, [convertFrom, convertTo, convertFrom]);

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
          <Text style={{color: lightColor, fontFamily: 'Gruppo-Regular'}}>
            {' '}
            {getCurrentDate()}{' '}
          </Text>
          {/* hamburger icon  */}
          <TouchableOpacity
            onPress={() => {
              alert('CURRENCY EXCHANGE V 1.0.0');
            }}>
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
            {/* ConverToFLAG */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <View
                style={{
                  // backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'grey',
                  height: 35,
                  width: 35,
                  elevation: 10,
                  marginHorizontal: 10,
                  // borderRadius: 20,
                }}>
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <ActivityIndicator color={lightColor} />
                </View>
                <Image
                  source={{
                    uri: flagFrom,
                  }}
                  style={{
                    height: 35,
                    width: 35,
                    // margin: 5,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '35%',
              }}>
              <TextInput
                // editable={!isFetching}
                keyboardType={'decimal-pad'}
                style={{
                  color: 'white',
                  fontSize: 35,
                  borderBottomWidth: 2,
                  borderColor: 'white',
                  padding: 15,
                  fontFamily: 'Gruppo-Regular',
                }}
                // value={input.toString()}
                onChangeText={(inputValue) => {
                  setinput(inputValue);
                }}
                placeholder={'1'}
                onSubmitEditing={(inputValue) => {
                  var amount = inputValue.nativeEvent.text;
                  console.log({amount});
                  if (amount !== 0 && amount !== '') {
                    setisFetching(true);
                    convertAmount(
                      from_to,
                      amount,
                      setisFetching,
                      setresult,
                      netState,
                    );
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
                onValueChange={(itemValue, index) => {
                  setconvertFrom(itemValue);
                  setflagFrom(currencies[index].flagURL);
                }}>
                {/* <Picker.Item label="DZD" value="DZD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="USD" value="USD" /> */}
                {currencies.map((element) => {
                  return (
                    <Picker.Item
                      key={element.abbreviation}
                      label={element.abbreviation}
                      value={element.abbreviation}
                    />
                  );
                })}
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
            {/* ConverToFLAG */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <View
                style={{
                  // backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'grey',
                  height: 35,
                  width: 35,
                  elevation: 10,
                  marginHorizontal: 10,
                  // borderRadius: 20,
                }}>
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <ActivityIndicator color={lightColor} />
                </View>
                <Image
                  source={{
                    uri: flagto,
                  }}
                  style={{
                    height: 35,
                    width: 35,
                    // margin: 5,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '35%',
              }}>
              <TextInput
                editable={false}
                keyboardType={'decimal-pad'}
                style={{
                  color: mainColor,
                  fontSize: 35,
                  borderBottomWidth: 2,
                  borderColor: mainColor,
                  padding: 15,
                  fontFamily: 'Gruppo-Regular',
                }}
                value={result ? result.toString() : '0'}
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
                onValueChange={(itemValue, index) => {
                  setconvertTo(itemValue);
                  setflagto(currencies[index].flagURL);
                }}>
                {currencies.map((element) => {
                  return (
                    <Picker.Item
                      key={element.abbreviation}
                      label={element.abbreviation}
                      value={element.abbreviation}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
      </View>

      <View style={{position: 'absolute', bottom: '43%', right: '43%'}}>
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

      {/* swap button  */}

      <View
        style={{
          position: 'absolute',
          bottom: '43%',
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
          }}
          onPress={() => {
            // switch picker
            const temp = convertFrom;
            setconvertFrom(convertTo);
            setconvertTo(temp);

            // switch IMG

            const tempIMG = flagFrom;
            setflagFrom(flagto);
            setflagto(tempIMG);

            setfrom_to(convertTo + '_' + convertFrom);
          }}>
          <Text style={{fontSize: 40, color: mainColor}}>↑↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
