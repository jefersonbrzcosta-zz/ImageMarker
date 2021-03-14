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
  const imageWidth = dimensions.width;

  const calculateStyles = (styles) => {
    // console.log(styles, 'marker');
    // console.log(imageStyle, 'image in');
    let scaleMagicNumber = 0;
    let calcScaleLeft;
    let calcScaleTop;
    let calc1;
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
    console.log(marker.scale, 'marker Scale');
    console.log(imageSty.scale, 'marker Scale');

    //check if image/marker was scale
    const isImageScale = imageStyle ? imageSty.scale !== 1 : false;
    const isMarkerScale = marker.scale !== 1;

    //compensate marker scale when fix marker
    // if ((!isMarkerScale && !isImageScale) || (isMarkerScale && !isImageScale)) {
    scaleMagicNumber = 155;
    calc1 = styles.left - (marker.scale * scaleMagicNumber - scaleMagicNumber);
    calcScaleLeft = calc1 - imageSty.left;
    calcScaleTop = marker.top - imageSty.top;
    // }

    //compensate image scale when fix marker
    // if (!isMarkerScale && isImageScale) {
    //   calcScaleLeft = calc1;
    // }

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
        rotatable={false}
        draggable={image.move}
        scalable={image.move}
        onStart={(event, styles) => {
          console.log(styles, 'image start');
          setImageStyle(styles);
        }}
        onEnd={(event, styles) => {
          console.log(styles, 'image ends');
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
            rotatable={false}
            onStart={(event, styles) => {
              console.log(styles, 'markerStart');
            }}
            onEnd={(event, styles) => {
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
