import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types'
const placeholderImage = require('../assets/images/placeholder.png');


const Card = ({item}) => {

  const {poster_path = '', name = ''} = item;

  const isTVShow = name !== undefined && name !== '';
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={
          poster_path
            ? {uri: `https://image.tmdb.org/t/p/w500${poster_path}`}
            : placeholderImage
        }></Image>
      {isTVShow
        ? !poster_path && <Text style={styles.imageTitle}>{name}</Text>
        : !poster_path && <Text style={styles.imageTitle}>{item.title}</Text>}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
    marginTop: 8,
    // marginRight: 10,
  },
  imageTitle: {
    width: 120,
    position: 'absolute',
    fontWeight: 'bold',
  },
});

export default Card;
