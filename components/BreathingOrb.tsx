import React, { JSX, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

export default function BreathingOrb({ size = 110 }: { size?: number }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  const [sparks, setSparks] = useState<JSX.Element[]>([]);

  // Use useRef for sparkCount to avoid rerender erasing the map
  const sparkCount = useRef(12);
  const triggerSparks = () => {
    const directions = Array.from({ length: sparkCount.current }).map((_, i) => {
      const angle = (2 * Math.PI * i) / sparkCount.current;
      const radius = 100 + Math.random() * 30;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        color: Math.random() > 0.5 ? '#b3e5fc' : '#c6f6c4',
      };
    });

    const newSparks = directions.map((dir, i) => {
      const anim = new Animated.Value(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      return (
        <Animated.View
          key={`spark-${Date.now()}-${i}`}
          style={{
            position: 'absolute',
            left: size / 2 - 4,
            top: size / 2 - 4,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: dir.color,
            transform: [
              {
                translateX: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, dir.x],
                }),
              },
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, dir.y],
                }),
              },
              {
                scale: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ],
            opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
          }}
        />
      );
    });

    setSparks(newSparks);
    setTimeout(() => setSparks([]), 700); // Cleanup after animation
  };

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(pressAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pressAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    triggerSparks();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.wrapper, { width: size + 100, height: size + 100 }]}>
        <View style={[StyleSheet.absoluteFill, { zIndex: 10 }]} pointerEvents="none">
          {sparks}
        </View>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.outline,
              {
                width: size + 20,
                height: size + 20,
                borderRadius: (size + 20) / 2,
                transform: [{ scale: Animated.multiply(scale, pressAnim) }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.inner,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                transform: [{ scale: Animated.multiply(scale, pressAnim) }],
              },
            ]}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    alignSelf: 'center',
    overflow: 'visible',
    position: 'relative',
  },
  inner: {
    backgroundColor: '#b3e5fc',
    position: 'absolute',
  },
  outline: {
    borderColor: '#c6f6c4',
    borderWidth: 4,
    position: 'absolute',
  },
});