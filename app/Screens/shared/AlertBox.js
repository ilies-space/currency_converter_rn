import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {alertStyles} from '../../theme/Styles';

export default function AlertBox({title, text, displayAlert, setDisplayAlert}) {
  return (
    <Modal visible={displayAlert} transparent={true} animationType={'fade'}>
      <View style={alertStyles.view} />
      <View style={alertStyles.mainOuterComponent}>
        <View style={alertStyles.mainContainer}>
          {/* Alert title */}
          <View style={alertStyles.topPart}>
            <Text style={alertStyles.alertTitle}>{title}</Text>
          </View>
          {/* Alert message */}
          <View style={alertStyles.middlePart}>
            <Text style={alertStyles.alertMessage}>{text}</Text>
          </View>
          {/* Alert button */}
          <View style={alertStyles.bottomPart}>
            <TouchableOpacity
              style={alertStyles.alertButton}
              onPress={() => setDisplayAlert(false)}>
              <Text style={alertStyles.alertButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
