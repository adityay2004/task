import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { Platform, StatusBar, View, ActivityIndicator } from 'react-native';
import AuthNavigation from './AuthNavigation';
import { useSelector } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';

const AppContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useSelector((state) => state.loginReducer.loginData?.phoneNumber);

  const db = SQLite.openDatabase(
    { name: 'appointments.db', location: 'default' },
    () => {},
    (error) => {
      console.log(error);
    }
  );

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          advance TEXT,
          age INTEGER,
          appointmentNo TEXT,
          fees TEXT,
          gender TEXT,
          morningValue INTEGER,
          patientName TEXT,
          phoneNumber TEXT,
          remark TEXT,
          selectedDate TEXT,
          selectedTime TEXT,
          uhidNo TEXT
        )`,
        [],
        (tx, results) => {
          console.log('Table created successfully');
        },
        (tx, error) => {
          console.log('Error creating table', error);
        }
      );
    });
  };

  const fetchAppointments = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM appointments',
        [],
        (tx, results) => {
          const rows = results.rows.raw();

          setIsLoading(false);
          console.log(' fetching appointments from SQLite', rows);
        },
        (tx, error) => {
          console.log('Error fetching appointments from SQLite', error);
          setIsLoading(false);
        }
      );
    });
  };

  useEffect(() => {
    createTable();
    fetchAppointments();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      <View style={{ flex: 1, paddingTop: Platform.OS == 'ios' ? 50 : 0 }}>
        <NavigationContainer>
          {loginUser ? <AppNavigator /> : <AuthNavigation />}
        </NavigationContainer>
      </View>
    </View>
  );
};

export default AppContainer;
