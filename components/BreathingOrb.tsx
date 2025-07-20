import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function BreathingOrb({ size = 110 }: { size?: number }) {
  const scale = useRef(new Animated.Value(1)).current;

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

  return (
    <View style={[styles.container, { width: size + 20, height: size + 20 }]}>
      <Animated.View
        style={[
          styles.outline,
          {
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
            transform: [{ scale }],
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
            transform: [{ scale }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    alignSelf: 'center',
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