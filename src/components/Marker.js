/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

function Marker({id, selected}) {
  return (
    <View
      style={{
        position: 'relative',
        width: 100,
        height: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }}>
      <View
        style={{
          width: '25%',
          height: '25%',
          backgroundColor: selected ? 'orange' : 'gray',
          alignSelf: 'center',
          marginTop: '35%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{id}</Text>
      </View>
      <View
        style={{
          width: '35%',
          height: '35%',
          backgroundColor: 'transparent',
          borderTopWidth: 3,
          borderRightWidth: 3,
          position: 'absolute',
          right: 0,
        }}
      />
      <View
        style={{
          width: '35%',
          height: '35%',
          backgroundColor: 'transparent',
          borderBottomWidth: 3,
          borderLeftWidth: 3,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
}

export default Marker;
