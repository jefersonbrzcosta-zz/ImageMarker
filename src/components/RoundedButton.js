import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Lock, Unlock} from 'react-native-feather';

function RoundedButton({functionClick, active, title}) {
  const styles = StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      borderRadius: 40,
    },
    text: {
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title && title}</Text>
      <TouchableOpacity style={styles.button} onPress={functionClick}>
        {active ? <Unlock color="black" /> : <Lock color="black" />}
      </TouchableOpacity>
    </View>
  );
}

export default RoundedButton;
