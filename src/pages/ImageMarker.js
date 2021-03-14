/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image, Dimensions} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import RoundedButton from '../components/RoundedButton';
import Marker from '../components/Marker';

function ImageMarker() {
  const [image, setImage] = useState({
    move: true,
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

  const fixMarker = (marker) => {
    setFixedMarkers((prevFixMarkers) => [
      ...prevFixMarkers,
      {marker, style: markerStyle},
    ]);
    setMarkerStyle({});
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        marginTop: 50,
      }}>
      <Gestures
        rotatable={false}
        draggable={image.move}
        scalable={image.move}
        onEnd={(event, styles) => {
          setImageStyle(styles);
        }}>
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
        {fixedMarkers?.map((marker) => (
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
                    left: marker.style.left,
                    top: marker.style.top,
                  },
                  {transform: [{scale: marker.style.transform[1].scale}]},
                ]}>
                <Marker
                  key={marker.id}
                  id={marker.id}
                  selected={marker.selected}
                />
              </View>
            </Gestures>
          </>
        ))}
      </Gestures>
      <View>
        {markers.map((marker) => (
          <Gestures
            rotatable={false}
            onStart={(event, styles) => {
              console.log(styles, 'marker start');
            }}
            onEnd={(event, styles) => {
              console.log(styles, 'marker end');
              const filteredTransform = styles.transform.filter(
                (item) => item.scale,
              );
              setMarkerStyle({
                left: styles.left,
                top: styles.top,
                transform: [
                  {rotate: '0deg'},
                  {
                    scale: imageStyle
                      ? filteredTransform[0].scale /
                        imageStyle.transform[0].scale
                      : filteredTransform[0].scale,
                  },
                ],
              });
            }}>
            <Marker key={marker.id} id={marker.id} selected={marker.selected} />
          </Gestures>
        ))}
      </View>
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
  );
}

export default ImageMarker;
