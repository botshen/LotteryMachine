import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LotteryMachine} from './page/LotteryMachine';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <LotteryMachine />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    position: 'absolute',
    top: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  lotteryMachine: {
    position: 'relative',
    width: 300,
    height: 400,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
});
export default App;
