/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import Gestures from 'react-native-easy-gestures';

function ImageMarker() {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Gestures>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2015/08/02/22/18/barley-872000_960_720.jpg',
          }}
        />
      </Gestures>
    </View>
  );
}

export default ImageMarker;
