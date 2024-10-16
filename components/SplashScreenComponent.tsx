import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const Component = () => {
  const navigation = useNavigation();

  // Shared values for animations
  const opacity = useSharedValue(0); 
  const translateY = useSharedValue(50); 
  const scale = useSharedValue(1.2); 

  useEffect(() => {
    // Start animations
    opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    translateY.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.cubic) });

    // Navigate to the next screen after 6 seconds
    const timeout = setTimeout(() => {
      (navigation as any).navigate("index"); 
    }, 6000);

    return () => clearTimeout(timeout); 
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }, // Add scaling animation
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Animated Image with Scaling Effect */}
      <Animated.Image
        source={require('@/assets/images/gov.png')}
        style={[styles.govlogo, animatedStyle]} // Apply animated style to image
      />
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text style={styles.text}>Papua New Guinea Census</Text>
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", 
    justifyContent: "center",
    alignItems: "center",
  },
  govlogo: {
    height: 130,
    width: 250,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 32, 
    fontWeight: "bold",
    color: "#333333", 
    textAlign: "center",
  },
});

export default Component;

