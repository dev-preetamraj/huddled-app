import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { PropsWithChildren } from 'react'

export interface IContainer extends PropsWithChildren {
    styles: StyleProp<ViewStyle>
}

const Container: React.FC<IContainer> = ({children, styles}) => {
  return (
    <View style={styles}>
        {children}
    </View>
  )
}

export default Container