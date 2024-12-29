import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import { FontFamily } from '../../assets/theme/font';
import Apptheme from '../../assets/theme/apptheme';

const OfflineScreen = () => {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    onRetry();
  }, []);

  function onRetry() {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(state.isConnected, 'connectsion alert');
      setConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }

  return (
    <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon name="wifi-off" size={60} color="#fff" />
          </View>

          <Text style={styles.title}>No Internet Connection</Text>

          <Text style={styles.description}>Please check your internet settings and try again.</Text>

          <TouchableOpacity style={styles.retryButton} onPress={() => onRetry()}>
            <Icon name="refresh" size={20} color="#2196F3" />
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 25,
    color: Apptheme.color.whiteText,
    fontFamily: FontFamily.INTER600,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginVertical: 15,
    marginTop: 6,
    fontFamily: FontFamily.INTER400,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 3,
  },
  retryText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
});

export default OfflineScreen;
