import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Apptheme from '../../assets/theme/apptheme';
import { FontFamily } from '../../assets/theme/font';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AppointmentDetails = () => {
  const navigation = useNavigation();
  const loginUser = useSelector((state) => state.loginReducer.loginData);

  const appointmentList = useSelector((state) => state.appointmentReducer.appointmentList);

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.timeSlot}>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>Patient Name: </Text> {item.patientName}
      </Text>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>Appointment No: </Text> {item.appointmentNo}
      </Text>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>Date: </Text> {item.selectedDate}
      </Text>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>Time: </Text> {item.selectedTime}
      </Text>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>UHID: </Text> {item.uhidNo}
      </Text>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>Fees: </Text> {item.fees}
      </Text>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>Advance: </Text> {item.advance}
      </Text>
      <Text style={styles.appointmentText}>
        <Text style={styles.label}>Remarks: </Text> {item.remark}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={{ paddingTop: 4 }} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color="#354652" />
          </TouchableOpacity>
          <Text style={styles.headerText} numberOfLines={1}>
            Appointment Details
          </Text>
        </View>
        <Text style={styles.profileText}>
          {loginUser?.firstName} {loginUser?.lastName}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={styles.timelineIndicator}>
              <View style={styles.circle}></View>
              <View style={styles.line}></View>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.cardTitle}> Appointment Details</Text>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={appointmentList}
                renderItem={renderAppointmentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.menuCorner}>
        <TouchableOpacity style={styles.menuCornerIcon}>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontFamily: FontFamily.INTER700,
    fontSize: 16,
    color: '#354652',
    width: '60%',
  },
  profileText: {
    fontFamily: FontFamily.INTER700,
    fontSize: 13,
    color: Apptheme.color.text,
  },
  body: {
    paddingHorizontal: 12,
    flex: 1,
    paddingTop: 20,
  },
  card: {
    flex: 1,

    backgroundColor: '#FFFFFF',
    paddingBottom: 26,
    paddingTop: 20,
    marginBottom: 16,
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
  timelineIndicator: {
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 10,
  },
  circle: {
    borderColor: Apptheme.color.blue,
    borderRadius: 10,
    borderWidth: 3,
    height: 14,
    width: 14,
  },
  line: {
    marginTop: 10,
    width: 1.5,
    backgroundColor: '#DADADA',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 20,
  },
  cardTitle: {
    fontFamily: FontFamily.INTER600,
    fontSize: 13.5,
    color: Apptheme.color.text,
    marginBottom: 20,
  },

  timeSlot: {
    // backgroundColor: '#F7F6F6',
    backgroundColor: Apptheme.color.whiteText,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  timeText: {
    fontFamily: FontFamily.INTER700,
    fontSize: 13,
    color: Apptheme.color.text,
    textAlign: 'center',
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
  appointmentText: {
    // fontFamily: FontFamily.INTER500,
    // fontSize: 14,
    // color: Apptheme.color.text,
    // marginBottom: 6,
    fontFamily: FontFamily.INTER500,
    fontSize: 13.5,
    color: Apptheme.color.subText,
  },
  label: {
    fontFamily: FontFamily.INTER700,
    fontSize: 13,
    color: '#000',
  },
});

export default AppointmentDetails;
