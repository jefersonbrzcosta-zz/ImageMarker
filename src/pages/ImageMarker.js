/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image, Dimensions} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import RoundedButton from '../components/RoundedButton';
import Marker from '../components/Marker';

function ImageMarker() {
  const [image, setImage] = useState({
    move: true,
    zoom: true,
    rotate: false,
  });
  const [markers, setMarkers] = useState([
    {
      move: true,
      zoom: true,
      rotate: false,
      id: 0,
    },
  ]);
  const [fixedMarkers, setFixedMarkers] = useState([]);
  const [markerStyle, setMarkerStyle] = useState();
  const [imageStyle, setImageStyle] = useState();
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const calculateStyles = (styles) => {
    console.log(styles, 'marker');
    console.log(imageStyle, 'image in');
    let calcScaleLeft;
    let calcScaleTop;
    //Filter array to get only scale prop
    const filteredTransform = styles.transform.filter((item) => item.scale);
    const filteredImageTransform =
      imageStyle && imageStyle.transform.filter((item) => item.scale);

    // default options if undefined props:
    const stylesCheck = {
      imageSty: {
        top: imageStyle ? imageStyle.top : 0,
        left: imageStyle ? imageStyle.left : 0,
        scale: filteredImageTransform ? filteredImageTransform[0].scale : 1,
      },
      marker: {
        top: styles.top,
        left: styles.left,
        scale: filteredTransform[0].scale ? filteredTransform[0].scale : 1,
      },
    };

    const {imageSty, marker} = stylesCheck;

    const extraCalc = imageSty.scale === 1 ? 1 : 12.5 * imageSty.scale;
    calcScaleLeft = (marker.left - imageSty.left) / imageSty.scale - extraCalc;
    calcScaleTop = (marker.top - imageSty.top) / imageSty.scale - extraCalc;

    const results = {
      left: calcScaleLeft,
      top: calcScaleTop,
      transform: [
        {rotate: '0deg'},
        {
          scale: imageStyle ? marker.scale / imageSty.scale : marker.scale,
        },
      ],
    };
    isNaN(results.transform[1].scale) && alert('Scale NaN');
    console.log(results, 'results');

    return results;
  };

  const fixMarker = (marker) => {
    setFixedMarkers((prevFixMarkers) => [
      ...prevFixMarkers,
      {marker, style: markerStyle},
    ]);
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        marginTop: 50,
      }}>
      <Gestures
        style={{position: 'absolute'}}
        rotatable={image.rotate}
        draggable={image.move}
        scalable={image.zoom}
        onStart={(event, styles) => {
          // console.log(styles, 'image start');
        }}
        onEnd={(event, styles) => {
          console.log(styles, 'image ends');
          setImageStyle(styles);
        }}>
        <View>
          <Image
            style={{
              position: 'absolute',
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
              rotatable={false}
              draggable={false}
              scalable={false}>
              <View
                style={[
                  {
                    position: 'absolute',
                    left: marker.style.left,
                    top: marker.style.top,
                  },
                  {
                    transform: [
                      {
                        scale: isNaN(marker.style.transform[1].scale)
                          ? 1
                          : marker.style.transform[1].scale,
                      },
                    ],
                  },
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
            style={{position: 'absolute'}}
            rotatable={marker.rotate}
            draggable={marker.move}
            scalable={marker.zoom}
            onStart={(event, styles) => {
              console.log(styles, 'markerStart');
            }}
            onEnd={(event, styles) => {
              console.log(styles, 'markerEnd');
              setMarkerStyle(calculateStyles(styles));
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
            title="Marker"
            noIcon
            functionClick={() => fixMarker(marker)}
            active={image.move}
          />
        ))}
      </View>
    </View>
  );
}

export default ImageMarker;
