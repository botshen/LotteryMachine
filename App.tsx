import React, {useEffect, useState, useRef} from 'react';
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
  const [generatedBalls, setGeneratedBalls] = useState<Ball[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [numGeneratedBalls, setNumGeneratedBalls] = useState(0);

  useEffect(() => {
    const numBalls = 33; // 要添加的球的数量

    // 创建球的初始状态
    const initialBalls: Ball[] = Array.from({length: numBalls}, (_, index) => ({
      id: (index + 1).toString(),
      left: Math.random() * 270, // 随机初始位置
      top: Math.random() * 370, // 随机初始位置
      speedX: Math.random() > 0.5 ? 1 : -1, // 随机速度方向
      speedY: Math.random() > 0.5 ? 1 : -1, // 随机速度方向
    }));

    setBalls(initialBalls);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isStarted) {
      intervalId = setInterval(() => {
        setBalls(prevBalls =>
          prevBalls.map(ball => {
            let {left, top, speedX, speedY} = ball;

            left += speedX * 20; // 移动增量值
            top += speedY * 20; // 移动增量值

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
    }

    return () => {
      clearInterval(intervalId!);
    };
  }, [isStarted]);

  const handleStartLottery = () => {
    if (isStarted) {
      return;
    }

    setIsStarted(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsStarted(false);

      setNumGeneratedBalls(prevNumGeneratedBalls => {
        const remainingBalls = balls.filter(
          ball =>
            !generatedBalls.find(generatedBall => generatedBall.id === ball.id),
        );
        if (remainingBalls.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingBalls.length);
          const newGeneratedBall = remainingBalls[randomIndex];

          setGeneratedBalls(prevGeneratedBalls => [
            ...prevGeneratedBalls,
            newGeneratedBall,
          ]);

          if (prevNumGeneratedBalls + 1 === 5) {
            const first16Balls = remainingBalls.slice(0, 16);
            setBalls(first16Balls);
          }
        }

        return prevNumGeneratedBalls + 1;
      });
    }, 2000);
  };

  return (
    <>
      {!isStarted && (
        <TouchableOpacity
          onPress={handleStartLottery}
          style={styles.startButton}>
          <Text style={styles.buttonText}>开始摇奖</Text>
        </TouchableOpacity>
      )}
      <View style={styles.lotteryMachine}>
        {/* 渲染球 */}
        {balls.map(ball => (
          <View
            key={ball.id}
            style={[
              styles.ball,
              {left: ball.left, top: ball.top},
              numGeneratedBalls >= 5 ? styles.blueBall : null,
            ]}>
            <Text
              style={[
                styles.ballText,
                numGeneratedBalls >= 5 ? styles.blueText : null,
              ]}>
              {numGeneratedBalls >= 5 ? (Number(ball.id) % 16) + 1 : ball.id}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.bottomContainer}>
        {/* 渲染已生成的球 */}
        {generatedBalls.map((ball, index) => (
          <View
            key={ball.id}
            style={[
              styles.bottomBall,
              index === 5 && numGeneratedBalls >= 5 ? styles.blueBall : null,
            ]}>
            <Text
              style={[
                styles.bottomBallText,
                index === 5 && numGeneratedBalls >= 5 ? styles.blueText : null,
              ]}>
              {ball.id}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  bottomBall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  bottomBallText: {
    color: 'white',
    fontWeight: 'bold',
  },
  blueBall: {
    backgroundColor: 'blue',
  },
  blueText: {
    color: 'white',
  },
});

export default App;
