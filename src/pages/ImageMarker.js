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
  const imageHeight = 300;
  const imageWidth = dimensions.width;
  console.log(imageWidth);
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
    const styleMarker = {
      left: markerStyle?.left ? markerStyle?.left : 0,
      top: markerStyle?.top ? markerStyle?.top : 0,
      transform: [
        {
          scale: markerStyle?.transform[0]?.scale
            ? markerStyle?.transform[0].scale
            : 1,
        },
        {
          rotate: markerStyle?.transform[1]?.rotate
            ? markerStyle?.transform[1].rotate
            : '0deg',
        },
      ],
    };

    const styleImage = {
      left: imageStyle?.left ? imageStyle?.left : 0,
      top: imageStyle?.top ? imageStyle?.top : 0,
      transform: [
        {
          scale: imageStyle?.transform[0]?.scale
            ? imageStyle?.transform[0].scale
            : 1,
        },
        {
          rotate: imageStyle?.transform[1]?.rotate
            ? imageStyle?.transform[1].rotate
            : '0deg',
        },
      ],
    };

    setFixedMarkers((prevFixMarkers) => [
      ...prevFixMarkers,
      {marker, styleMarker, styleImage},
    ]);
    setMarkerStyle({});
  };

  return (
    <>
      <View
        style={{
          position: 'absolute',
          // display: 'flex',
          // flex: 1,
          // maxWidth: imageWidth,
          // marginTop: 30,
          // backgroundColor: 'reds',
        }}>
        <Gestures
          // style={{
          //   backgroundColor: 'blue',
          //   // height: 100,
          //   // maxWidth: 100,
          // }}
          rotatable={false}
          draggable={image.move}
          scalable={image.move}
          onEnd={(event, styles) => {
            console.log(styles, 'image');
            setImageStyle(styles);
          }}>
          {/* <View style={{backgroundColor: 'blue', flex: 1}}> */}

          {/* </View> */}

          {fixedMarkers?.map((marker, index) => {
            console.log(marker.styleImage, 'markers');
            const markerScale = marker.styleMarker.transform[0]?.scale;
            const markerRotate = marker.styleMarker.transform[1]?.rotate;
            const imageScale = marker.styleImage.transform[0]?.scale;

            console.log(marker.styleMarker, 'styleMarker');
            console.log(marker.styleImage, 'styleImage');

            return (
              <>
                <Gestures
                  style={{}}
                  key={marker.id}
                  rotatable={marker.move}
                  draggable={marker.move}
                  scalable={marker.move}>
                  <View
                    // style={{top: -100}}
                    style={[
                      {
                        position: 'absolute',
                        left:
                          (marker.styleMarker.left +
                            (392 * imageScale - 392) / 2) *
                            (markerScale / imageScale) -
                          25,
                        // top:
                        //   marker.styleMarker.top -
                        //   (imageScale * 300 - 300) / 2 -
                        //   180,
                        // top: -250,
                        top:
                          ((300 * imageScale - 300) / 2) *
                            (markerScale / imageScale) -
                          25,
                      },
                      // {transform: marker.styleMarker.transform},
                      {
                        transform: [
                          {
                            scale: markerScale / imageScale,
                          },
                          {
                            rotate: markerRotate,
                          },
                        ],
                      },
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
          <Image
            style={{
              width: imageWidth,
              height: imageHeight,
              backgroundColor: 'red',
              zIndex: -1000,
            }}
            resizeMode="cover"
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2015/08/02/22/18/barley-872000_960_720.jpg',
            }}
          />
        </Gestures>

        <View style={{position: 'absolute', bottom: -400, marginLeft: 20}}>
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
