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
  console.log(imageStyle, 'image out');

  const calculateStyles = (styles) => {
    console.log(styles, 'marker');
    console.log(imageStyle, 'image in');
    let scaleMagicNumber = 0;
    let calcScaleLeft;
    let calc1;
    //Filter array to get only scale prop
    const filteredTransform = styles.transform.filter((item) => item.scale);
    const filteredImageTransform =
      imageStyle && imageStyle.transform.filter((item) => item.scale);
    console.log(filteredImageTransform);

    // default options if undefined props:
    const stylesCheck = {
      image: {
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

    const {image, marker} = stylesCheck;

    //check if image/marker was scale
    const isImageScale = imageStyle ? image.scale !== 1 : false;
    const isMarkerScale = marker.scale !== 1;

    //compensate marker scale when fix marker
    if ((!isMarkerScale && !isImageScale) || (isMarkerScale && !isImageScale)) {
      scaleMagicNumber = 155;
      calc1 =
        styles.left - (marker.scale * scaleMagicNumber - scaleMagicNumber);
      calcScaleLeft = calc1;
    }

    //compensate image scale when fix marker
    if (!isMarkerScale && isImageScale) {
      console.log('marker não tem scale, mas imagem tem');
      calcScaleLeft = calc1;
    }

    const results = {
      left: calcScaleLeft,
      top: styles.top,
      transform: [
        {rotate: '0deg'},
        {
          scale: imageStyle ? marker.scale / image.scale : marker.scale,
        },
      ],
    };
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
        draggable={false}
        scalable={image.move}
        onEnd={(event, styles) => {
          console.log(styles, 'changing image styles');
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
            // onStart={(event, styles) => {
            //   console.log(styles, 'markerStart');
            // }}
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
