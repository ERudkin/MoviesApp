import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
 const Error = (props) => {
         const {errorText1, errorText2} = props;
         return (
            <View styles = {styles.container}>
                <Text style = {styles.text}>{errorText1}</Text>
                <Text style = {styles.text}>{errorText2}</Text>
            </View>
         );
 }


 const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyCoontent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold'
    }
 })

 export default Error