import React from 'react';
import {Text, Platform} from 'react-native';
// import {LinearGradient} from 'expo-linear-gradient'; // For managed Expo projects
// OR
import LinearGradient from 'react-native-linear-gradient'; // For bare React Native projects

interface BallProps {
  number: string;
  color: string;
  containerStyle?: object;
}

export const BallItem: React.FC<BallProps> = (props: BallProps) => {
  const {number, color} = props;

  return (
    <LinearGradient
      colors={[color, 'black']} // Replace 'black' with the color you want as the end of the gradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.5, 1]} // Adjust the locations based on the gradient effect you want
      style={[
        props.containerStyle,
        {
          width: 30,
          height: 30,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          ...Platform.select({
            ios: {
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 10,
              shadowOpacity: 1,
            },
            android: {
              elevation: 10,
            },
          }),
        },
      ]}>
      <Text style={{color: 'white', fontSize: 16}}>{number}</Text>
    </LinearGradient>
  );
};
