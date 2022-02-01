import React from 'react';
import {Text, Image, FlatList, StyleSheet, View} from 'react-native';
import  Card  from './Card';
import PropTypes from 'prop-types'


const defaultProps = {
  item: PropTypes.Object,
  title: PropTypes.String
}


const List = (props) => {
  const {item, title = ''} = props;
  return (
    <View style={styles.container}>
      <Text style = {styles.title}>{title}</Text>
      <FlatList
        horizontal={true}
        data={item}
        renderItem={({item}) => {
          const {poster_path, name} = item;
          return (
            <View >
              <Card item = {item}></Card>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 20,
    marginVertical: 12
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textShadowRadius: 20,
    textShadowColor: 'black',
    color: 'white',
    marginTop: 8,
    paddingLeft: 5
  },
  image: {
    width: 130,
    height: 150,
    // resizeMode: 'contain',
    marginTop: 8,
    // marginRight: 10
  },
});

List.DefaultProps = defaultProps


export default List;
