import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Apptheme from '../../assets/theme/apptheme';
import { FontFamily } from '../../assets/theme/font';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedulerData } from '../../redux/reducers/slice/schedulerSlice';
import OfflineScreen from './OfflineScreen';
import NetInfo from '@react-native-community/netinfo';

const Schedule = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const schedulerList = useSelector((state) => state.schedulerReducer.schedulerDataList);
  const isFocused = useIsFocused();
  console.log('schedulerList schedulerList', schedulerList);

  const fetchData = async () => {
    try {
      const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
      if (isConnected) {
        const response = await fetch(
          'https://677116202ffbd37a63ce280f.mockapi.io/api/v4/scheduler/abcd'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        dispatch(addSchedulerData(jsonData));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const loginUser = useSelector((state) => state.loginReducer.loginData);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();
  const formatDate = (date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ /g, '-');
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (schedulerList.length <= 0) {
    return <OfflineScreen></OfflineScreen>;
  }

  const renderTableRow = ({ item }) => (
    <Pressable
      style={styles.tableRow}
      onPress={() => {
        navigation.navigate(RouteName.SCHEDULE_TIME_SCREEN, {
          dateDetails: item,
        });
      }}
    >
      <View style={[styles.tableCell, { flex: 3, marginLeft: 6 }]}>
        <Text style={[styles.tableCell]}>{item.date}</Text>
        <Text style={[styles.tableCell, { paddingTop: 2 }]}> {item.day}</Text>
      </View>
      <Text style={styles.tableCell}>{item.morning}</Text>
      <Text style={styles.tableCell}>{item.noon}</Text>
      <Text style={styles.tableCell}>{item.evening}</Text>
      <Text style={styles.tableCell}>{item.night}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} numberOfLines={1}>
          Schedule An Appointment
        </Text>
        <View style={styles.profile}>
          <Text style={styles.profileText} numberOfLines={1}>
            {loginUser?.firstName} {loginUser?.lastName}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', paddingLeft: 18, paddingTop: 8, paddingRight: 10 }}>
            <View
              style={{
                borderColor: Apptheme.color.blue,
                borderRadius: 20,
                borderWidth: 3,
                height: 14,
                width: 14,
                marginTop: 3,
              }}
            ></View>
            <View
              style={{
                marginTop: 10,
                width: 1.5,
                backgroundColor: '#DADADA',
                flex: 1,
              }}
            ></View>
          </View>
          <View style={{ flex: 1, paddingRight: 20, paddingLeft: 3 }}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Choose date for your appointment</Text>
              <View style={styles.dateSelector}>
                <TouchableOpacity style={styles.buttonView} onPress={goToPreviousWeek}>
                  <Feather name="chevrons-left" size={18} color={Apptheme.color.whiteText} />
                </TouchableOpacity>
                <View style={styles.dateView}>
                  <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
                </View>
                <TouchableOpacity style={styles.buttonView} onPress={goToNextWeek}>
                  <Feather name="chevrons-right" size={18} color={Apptheme.color.whiteText} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.tableCell,
                  { flex: 3, fontFamily: FontFamily.INTER700, fontSize: 13.5, paddingLeft: 6 },
                ]}
              >
                Date
              </Text>
              <Text style={styles.tableCell}>🌅</Text>
              <Text style={styles.tableCell}>☀️</Text>
              <Text style={styles.tableCell}>🌇</Text>
              <Text style={styles.tableCell}>🌙</Text>
            </View>
            <View
              style={{
                elevation: 5,
                borderBottomWidth: 0,
                borderBottomColor: '#E7E7E7',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                overflow: 'hidden',
              }}
            >
              <FlatList
                data={schedulerList}
                renderItem={renderTableRow}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
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
    flex: 1,
  },
  headerText: {
    fontFamily: FontFamily.INTER700,
    fontSize: 16,
    color: '#354652',
    width: '50%',
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
    flexDirection: 'row',
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
  cardContent: {
    marginTop: 6,
  },

  cardTitle: {
    fontFamily: FontFamily.INTER600,
    fontSize: 13.5,
    color: Apptheme.color.text,
    marginBottom: 15,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 2,
  },
  buttonView: {
    backgroundColor: '#234C8C',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 18,
  },
  dateView: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Apptheme.color.danger,
  },
  selectedDate: {
    fontFamily: FontFamily.INTER500,
    fontSize: 13.5,
    color: Apptheme.color.text,
    paddingBottom: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Apptheme.color.whiteText,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 5,
    borderBottomWidth: 0.8,
    borderBottomColor: '#E7E7E7',
    paddingRight: 0,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FAFAFA',
    borderBottomColor: '#E1E1E1',
    elevation: 10,
    paddingRight: 0,
  },
  tableCell: {
    fontFamily: FontFamily.INTER600,
    fontSize: 11.5,
    color: Apptheme.color.text,
    flex: 1,
    justifyContent: 'flex-start',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Schedule;
