import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

interface Ball {
  id: string;
  left: number;
  top: number;
  speedX: number;
  speedY: number;
}

const LotteryMachine: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const numBalls = 20; // 要添加的球的数量

    // 创建球的初始状态
    const initialBalls: Ball[] = Array.from({length: numBalls}, (_, index) => ({
      id: index.toString(),
      left: Math.random() * 270, // 随机初始位置
      top: Math.random() * 370, // 随机初始位置
      speedX: Math.random() > 0.5 ? 1 : -1, // 随机速度方向
      speedY: Math.random() > 0.5 ? 1 : -1, // 随机速度方向
    }));

    setBalls(initialBalls);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBalls(prevBalls =>
        prevBalls.map(ball => {
          let {left, top, speedX, speedY} = ball;

          left += speedX * 5; // 移动增量值
          top += speedY * 5; // 移动增量值

          // 边界检查，如果超出边界则反转速度方向
          if (left <= 0 || left >= 270) {
            speedX *= -1;
          }
          if (top <= 0 || top >= 370) {
            speedY *= -1;
          }

          return {...ball, left, top, speedX, speedY};
        }),
      );
    }, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.lotteryMachine}>
      {/* 渲染球 */}
      {balls.map(ball => (
        <View
          key={ball.id}
          style={[styles.ball, {left: ball.left, top: ball.top}]}>
          <Text style={styles.ballText}>{ball.id}</Text>
        </View>
      ))}
    </View>
  );
};

const App: React.FC = () => {
  const handleStartLottery = () => {
    // 在这里处理开始摇奖的逻辑
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleStartLottery} style={styles.button}>
        <Text style={styles.buttonText}>开始摇奖</Text>
      </TouchableOpacity>
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
  button: {
    marginBottom: 20,
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
  ball: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  ballText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;