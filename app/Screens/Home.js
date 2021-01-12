import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../theme/Colors';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      {/* TOP VIEW */}
      <View style={{backgroundColor: Colors.mainColor, flex: 1}}>
        <Text>CONTENT HERE</Text>
      </View>
    </View>
  );
}
