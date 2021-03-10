/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import RoundedButton from '../components/RoundedButton';
import Marker from '../components/Marker';
import MarkerOnImage from '../components/MarkerOnImage';

function ImageMarker() {
  const [image, setImage] = useState({
    move: false,
    selected: false,
  });
  const [markers, setMarkers] = useState([
    {
      move: false,
      selected: false,
      id: 1,
    },
  ]);
  const [fixedMarkers, setFixedMarkers] = useState([]);
  const [markerStyle, setMarkerStyle] = useState();
  const [imageStyle, setImageStyle] = useState();
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;
  console.log(fixedMarkers);
  const makeMarkerSelected = (id) => {
    const array = markers.map((marker) => {
      if (marker.id === id) {
        return {...marker, selected: !marker.selected};
      } else {
        return marker;
      }
    });
    setMarkers(array);
  };

  const makeMarkerMove = (id) => {
    const array = markers.map((marker) => {
      if (marker.id === id) {
        return {...marker, move: !marker.move};
      } else {
        return marker;
      }
    });
    setMarkers(array);
  };

  const fixMarker = (marker) => {
    setFixedMarkers((prevFixMarkers) => [
      ...prevFixMarkers,
      {marker, styleMarker: markerStyle, styleImage: imageStyle},
    ]);
    setMarkerStyle({});
  };

  return (
    <>
      <View
        style={{
          display: 'flex',
          flex: 1,
          // marginTop: 30,
        }}>
        <Gestures
          rotatable={false}
          draggable={image.move}
          scalable={image.move}
          onEnd={(event, styles) => {
            console.log(styles, 'image');
            setImageStyle(styles);
          }}>
          <TouchableWithoutFeedback
            onPress={() =>
              setImage((prev) => ({...prev, selected: !prev.selected}))
            }>
            <View>
              <Image
                style={{
                  width: imageWidth,
                  height: 300,
                }}
                source={{
                  uri:
                    'https://cdn.pixabay.com/photo/2015/08/02/22/18/barley-872000_960_720.jpg',
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          {fixedMarkers?.map((marker, index) => {
            console.log(marker.styleImage, 'markers');
            return (
              <>
                <Gestures
                  key={marker.id}
                  rotatable={marker.move}
                  draggable={marker.move}
                  scalable={marker.move}>
                  <View
                    style={[
                      {
                        position: 'absolute',
                        left: marker.styleMarker.left - marker.styleImage.left,
                        top:
                          marker.styleMarker.top - marker.styleImage.top - 300,
                      },
                      {transform: marker.styleMarker.transform},
                    ]}>
                    <MarkerOnImage
                      key={marker.id}
                      id={marker.id}
                      selected={marker.selected}
                      // scale={marker.}
                    />
                  </View>
                </Gestures>
              </>
            );
          })}
        </Gestures>

        <View style={{position: 'absolute', bottom: 0, marginLeft: 20}}>
          <RoundedButton
            title="Image"
            functionClick={() =>
              setImage((prev) => ({...prev, move: !prev.move}))
            }
            active={image.move}
          />
          {markers.map((marker) => (
            <RoundedButton
              title="Marker: "
              functionClick={() => fixMarker(marker)}
              active={image.move}
            />
          ))}
        </View>
      </View>
      <View style={{position: 'absolute', top: 0}}>
        {markers.map((marker) => (
          <Gestures
            onEnd={(event, styles) => {
              console.log(styles, 'marker');
              setMarkerStyle(styles);
            }}>
            <Marker key={marker.id} id={marker.id} selected={marker.selected} />
          </Gestures>
        ))}
      </View>
    </>
  );
}

export default ImageMarker;
