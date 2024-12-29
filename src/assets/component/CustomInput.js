import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontFamily } from '../theme/font';
import Apptheme from '../theme/apptheme';

const CustomInput = ({ label, placeholder, value, onChangeText, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      animate(1);
    }
  }, [value]);

  const animate = (toValue) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animate(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      animate(0);
    }
  };

  const handleLabelPress = () => {
    inputRef.current?.focus();
  };

  const labelPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  const fontSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 11],
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleLabelPress}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [{ translateY: labelPosition }],
              fontSize: fontSize,
              color: isFocused ? '#4A90E2' : '#999',
            },
          ]}
        >
          {label}
        </Animated.Text>
      </TouchableWithoutFeedback>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, isFocused && styles.focusedInput, error && styles.errorInput]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    position: 'absolute',
    left: 16,
    backgroundColor: 'white',
    // paddingHorizontal: 4,
    zIndex: 1,
    fontFamily: FontFamily.INTER400,
    fontSize: 10.5,
    color: Apptheme.color.subText,
    bottom: 28,
  },
  input: {
    height: 48,
    borderWidth: 0.8,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    fontSize: 14,
    paddingTop: 16,
    paddingBottom: 0,
    textAlignVertical: 'center',
  },
  focusedInput: {
    borderColor: '#2D3F88',
    borderWidth: 2,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
});

export default CustomInput;
