import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Apptheme from '../../assets/theme/apptheme';
import { FontFamily } from '../../assets/theme/font';
import { useNavigation } from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigation = useNavigation();
  const loginUser = useSelector((state) => state.loginReducer.loginData);
  const appointmentList = useSelector((state) => state.appointmentReducer.appointmentList);

  console.log(`appointmentList =====>`, appointmentList);
  const menuItems = [
    {
      id: 1,
      title: 'Schedule An Appointment',
      subtitle: 'Book your upcoming appointment',
      icon: 'calendar-clock',
    },
    {
      id: 2,
      title: 'Upload Document',
      subtitle: 'Upload and View Your Reports and Documents',
      icon: 'folder-upload',
    },
    {
      id: 3,
      title: 'My OPDs',
      subtitle: 'View your previous OPD prescriptions',
      icon: 'clipboard-text-clock',
    },
    {
      id: 4,
      title: 'My Appointment',
      subtitle: 'View your upcoming appointment history',
      icon: 'calendar-check',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <View style={styles.profile}>
          <Text style={styles.profileText}>
            {loginUser?.firstName} {loginUser?.lastName}
          </Text>
          <View style={styles.profileIconContainerOuter}>
            <View style={styles.profileIconContainer}>
              <Icon name="filter" size={13} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (item.id == 1) navigation.navigate(RouteName.SCHEDULE_SCREEN);
              else if (item.id == 4) navigation.navigate(RouteName.APPOINTMENT_DETAILS_SCREEN);
            }}
          >
            <Icon name={item.icon} size={46} color="#B54C3B" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuCorner}>
        <TouchableOpacity style={styles.menuCornerIcon} onPress={() => {}}>
          <Icon name="menu" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    borderColor: '#1a4f8b',
    borderRightWidth: 4,
    borderTopRightRadius: 4,
  },
  header: {
    paddingBottom: 10,
    paddingTop: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Apptheme.color.whiteText,
  },
  body: {
    paddingHorizontal: 12,
  },
  headerText: {
    fontFamily: FontFamily.INTER700,
    fontSize: 17,
    color: '#354652',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 12,
  },
  profileText: {
    fontFamily: FontFamily.INTER700,
    fontSize: 13,
    color: Apptheme.color.text,
  },

  profileIconContainerOuter: {
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: '#D3DBE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: '#7B93BB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuCorner: {
    position: 'absolute',
    right: -50,
    top: 26,
    width: 70,
    height: 70,
    backgroundColor: '#1a4f8b',
    transform: [{ rotate: '135deg' }],
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 15,
    zIndex: 2,
  },
  menuCornerIcon: {
    padding: 10,
    transform: [{ rotate: '45deg' }],
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 26,
    paddingTop: 20,
    marginBottom: 16,
    alignItems: 'center',

    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,

    borderLeftColor: '#4FB0C9',
    borderRightColor: '#4FB0C9',
    borderLeftWidth: 4.5,
    borderRightWidth: 4.5,

    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#D0D1D4',
    borderBottomColor: '#D0D1D4',
  },
  cardContent: {
    marginTop: 12,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: FontFamily.INTER600,
    fontSize: 13,
    color: Apptheme.color.text,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontFamily: FontFamily.INTER500,
    fontSize: 11,
    color: Apptheme.color.subText,
    textAlign: 'center',
  },
});

export default Dashboard;
