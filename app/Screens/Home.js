import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../theme/Colors';

export default function Home() {
  // Colors used
  const mainColor = Colors.mainColor;
  const lightColor = Colors.light;
  //utility

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
      </View>
    </View>
  );
}
