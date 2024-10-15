import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const SplashScreenComponent = () => {
  const navigation = useNavigation();

  // Shared values for animations
  const opacity = useSharedValue(0); // Opacity starts at 0 (invisible)
  const translateY = useSharedValue(50); // Y position starts slightly off-screen
  const scale = useSharedValue(1.2); // Scale starts slightly larger for a zoom effect

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
      (navigation as any).navigate("index"); // Replace Splash screen with Home
    }, 6000);

    return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
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

// Styling for splash screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background color
    justifyContent: "center",
    alignItems: "center",
  },
  govlogo: {
    height: 130,
    width: 250,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center', // Center align the text
  },
  text: {
    fontSize: 32, // Large font size for prominence
    fontWeight: "bold",
    color: "#333333", // Dark color for contrast
    textAlign: "center",
  },
});

export default SplashScreenComponent;

