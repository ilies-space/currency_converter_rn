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
import AlertBox from './shared/AlertBox';
import {homeStyles} from '../theme/Styles';

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
  const [isFetching, setisFetching] = useState(false);
  // Alertbox states
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  var netState = getNetworkStatu();

  // handle UPDATE or SWAP
  useEffect(() => {
    if (netState) {
      if (input !== 0 && input !== '') {
        convertAmount(
          from_to,
          input,
          setisFetching,
          setresult,
          netState,
          setDisplayAlert,
          setAlertText,
        );
      }
    }
  }, [convertFrom, convertTo]);

  return (
    <View style={homeStyles.container}>
      {/* Alertbox */}
      <AlertBox
        displayAlert={displayAlert}
        setDisplayAlert={setDisplayAlert}
        title="Srafly (Currency converter)"
        text={alertText}
      />
      {/* TOP VIEW */}
      <View style={homeStyles.topView}>
        {/* header  */}
        <View style={homeStyles.header}>
          {/* curret date */}
          <Text style={homeStyles.currentDate}> {getCurrentDate()} </Text>
          {/* hamburger icon  */}
          <TouchableOpacity
            onPress={() => {
              setAlertText('CURRENCY EXCHANGE V 0.95');
              setDisplayAlert(true);
            }}>
            <View style={homeStyles.hamburgerIcon1} />
            <View style={homeStyles.hamburgerIcon2} />
            <View style={homeStyles.hamburgerIcon3} />
          </TouchableOpacity>
        </View>
        {/* Main View  1*/}
        <View style={homeStyles.mainView1}>
          {/* INPUT AREA  */}
          <View style={homeStyles.inputArea}>
            {/* ConverToFLAG */}
            <View style={homeStyles.convertToContainer}>
              <View style={homeStyles.convertToBackground}>
                <View style={homeStyles.convertToPosition}>
                  <ActivityIndicator color={lightColor} />
                </View>
                <Image
                  source={{
                    uri: flagFrom,
                  }}
                  style={homeStyles.flagSize}
                />
              </View>
            </View>
            <View style={homeStyles.inputWidth}>
              <TextInput
                // editable={!isFetching}
                keyboardType={'decimal-pad'}
                style={homeStyles.inputStyle}
                // value={input.toString()}
                onChangeText={(inputValue) => {
                  setinput(inputValue);
                }}
                placeholder={'1'}
                onSubmitEditing={(inputValue) => {
                  var amount = inputValue.nativeEvent.text;
                  if (amount !== 0 && amount !== '') {
                    setisFetching(true);
                    convertAmount(
                      from_to,
                      amount,
                      setisFetching,
                      setresult,
                      netState,
                      setDisplayAlert,
                      setAlertText,
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
                style={homeStyles.changeCurrencyPicker}
                itemStyle={homeStyles.changeCurrencyPickerTextFont}
                dropdownIconColor={'white'}
                onValueChange={(itemValue, index) => {
                  setconvertFrom(itemValue);
                  setflagFrom(currencies[index].flagURL);
                }}>
                {currencies.map((element) => {
                  return (
                    <Picker.Item
                      color={mainColor}
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
        <View style={homeStyles.mainView2}>
          {/* Result AREA  */}
          <View style={homeStyles.resultArea}>
            {/* ConverToFLAG */}
            <View style={homeStyles.convertToFlagPosition}>
              <View style={homeStyles.convertToFlagStyle}>
                <View style={homeStyles.loadingFlagPosition}>
                  <ActivityIndicator color={lightColor} />
                </View>
                <Image
                  source={{
                    uri: flagto,
                  }}
                  style={homeStyles.flagSize}
                />
              </View>
            </View>
            <View style={homeStyles.inputWidth}>
              <TextInput
                editable={false}
                keyboardType={'decimal-pad'}
                style={homeStyles.inputStyleView2}
                value={result ? result.toString() : '0'}
                onChangeText={(inputValue) => {
                  setresult(inputValue);
                }}
              />
            </View>
            {/* change currency picker */}
            <View style={homeStyles.changeCurrencyPickerWidthView2}>
              <Picker
                mode={'dropdown'}
                selectedValue={convertTo}
                style={homeStyles.changeCurrencyPickerView2}
                dropdownIconColor={mainColor}
                itemStyle={homeStyles.changeCurrencyPickerTextFont}
                onValueChange={(itemValue, index) => {
                  setconvertTo(itemValue);
                  setflagto(currencies[index].flagURL);
                }}>
                {currencies.map((element) => {
                  return (
                    <Picker.Item
                      color={mainColor}
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

      <View style={homeStyles.fetchingIconPostion}>
        {isFetching ? (
          <View style={homeStyles.fetchingIconStyle}>
            <ActivityIndicator size="large" color={mainColor} />
          </View>
        ) : (
          <View />
        )}
      </View>

      {/* swap button  */}

      <View style={homeStyles.swapButtonPosition}>
        <TouchableOpacity
          style={homeStyles.swapButtonStyle}
          onPress={() => {
            // switch picker
            const temp = convertFrom;
            setconvertFrom(convertTo);
            setconvertTo(temp);
            // switch IMG
            const tempIMG = flagFrom;
            setflagFrom(flagto);
            setflagto(tempIMG);
            // upadte conversion statu
            setfrom_to(convertTo + '_' + convertFrom);
          }}>
          <Text style={{fontSize: 40, color: mainColor}}>↑↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
