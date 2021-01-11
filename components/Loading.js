import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import appColors from '../assets/appColor'

const Loading = () => {
    return (
        <View style={{...StyleSheet.absoluteFill,marginTop:20, position:"absolute", zIndex:1000, elevation:1000}}>
            <ActivityIndicator size="large" color={appColors.spinner}/>
        </View>
    )
}

export default Loading
//alignItems:"center", justifyContent:"center"