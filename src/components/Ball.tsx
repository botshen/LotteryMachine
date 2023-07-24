import React from 'react';
import {View, Text} from 'react-native';

interface BallProps {
  number: number;
  style: Object;
}

export const Ball: React.FC<BallProps> = (props: BallProps) => {
  const {number, style} = props;

  return (
    <View
      style={[
        {
          width: 24,
          height: 24,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            'background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
        },
        style,
      ]}>
      <Text style={{color: 'white', fontSize: 16}}>{number}</Text>
    </View>
  );
};
