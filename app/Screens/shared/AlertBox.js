import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Colors} from '../../theme/Colors';

export default function AlertBox({title, text, displayAlert, setDisplayAlert}) {
  return (
    <Modal visible={displayAlert} transparent={true} animationType={'slide'}>
      <View style={styles.mainOuterComponent}>
        <View style={styles.mainContainer}>
          {/* Alert title */}
          <View style={styles.topPart}>
            <Text style={styles.alertTitle}>{title}</Text>
          </View>
          {/* Alert message */}
          <View style={styles.middlePart}>
            <Text style={styles.alertMessage}>{text}</Text>
          </View>
          {/* Alert button */}
          <View style={styles.bottomPart}>
            <TouchableOpacity
              style={styles.alerButton}
              onPress={() => setDisplayAlert(false)}>
              <Text style={styles.alertButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flexDirection: 'column',
    height: '25%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#404040',
    borderRadius: 27,
    padding: 4,
  },
  topPart: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  middlePart: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 4,
    color: '#ffffff',
    fontSize: 16,
    marginVertical: 2,
  },
  bottomPart: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
  },
  alertTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 31,
    fontFamily: 'Gruppo-Regular',
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessage: {
    color: '#ffffff',
    textAlign: 'justify',
    fontSize: 27,
    padding: 2,
    fontFamily: 'Gruppo-Regular',
  },
  alerButton: {
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 50,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
  },
  alertButtonText: {
    fontSize: 23,
    fontFamily: 'Gruppo-Regular',
    color: '#ffffff',
  },
});
