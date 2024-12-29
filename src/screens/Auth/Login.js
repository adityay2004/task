import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontFamily } from '../../assets/theme/font';
import Apptheme from '../../assets/theme/apptheme';
import CustomInput from '../../assets/component/CustomInput';
import SignUpForm from './SignUpForm';
import { useNavigation } from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import { addLoginData } from '../../redux/reducers/slice/loginSlice';

const { height } = Dimensions.get('window');

const Login = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.authReducer.authDataList);

  const handleValidation = () => {
    if (value) {
      if (value.length < 1) {
        setError('Input must be at least 4 characters');
      } else {
        setError('');

        const matchingUser = userList.find((user) => user.phoneNumber === value);

        if (matchingUser) {
          dispatch(addLoginData(matchingUser));
          console.log('Matched User:', matchingUser);

          navigation.replace(RouteName.APP_NAVIGATION);
        } else {
          setError('No user found with the entered number');
          alert('No user found with the entered number');
        }
      }
    } else {
      setError('Input must be at least 4 characters');
    }
  };

  const db = SQLite.openDatabase(
    { name: 'authData.db', location: 'default' },
    () => console.log('Database opened successfully'),
    (error) => console.error('Error opening database', error)
  );

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS authData (id INTEGER PRIMARY KEY AUTOINCREMENT, dob TEXT, email TEXT, firstName TEXT, gender TEXT, initial TEXT, lastName TEXT, maritalStatus TEXT, middleName TEXT, phoneNumber TEXT)',
        [],
        () => console.log('Table created successfully'),
        (error) => console.error('Error creating table', error)
      );
    });
  };

  const fetchAuthDataFromDB = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM authData',
        [],
        (tx, results) => {
          const rows = results.rows.raw();

          console.log(' fetching authData from SQLite', rows);
        },
        (tx, error) => {
          console.log('Error fetching authData from SQLite', error);
        }
      );
    });
  };

  useEffect(() => {
    createTable();
    fetchAuthDataFromDB();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#254F8C', '#4B8B8A']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.halfScreenGradient}
      />

      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dataman Demonstration Package</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              <Text style={{ color: Apptheme.color.blue }}>Aar</Text>
              <Text style={{ color: Apptheme.color.green }}>ogi</Text>
            </Text>
          </View>
          {/* Existing Patient Section */}
          <Text style={styles.sectionTitle}>Existing Patient</Text>
          <Text style={styles.sectionSubtitle}>
            Enter your registered credentials & click login
          </Text>

          <View style={{ width: '90%', alignSelf: 'center' }}>
            <CustomInput
              label="Patient UHID / Mobile No."
              value={value}
              onChangeText={(text) => {
                setValue(text);
                setError('');
              }}
              error={error}
            />

            <TouchableOpacity style={styles.loginButton} onPress={() => handleValidation()}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.divider} />
          </View>

          <Text style={styles.sectionTitle}>New Registration</Text>
          <Text style={styles.sectionSubtitle}>
            Make yourself register by clicking on new registration.
          </Text>
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: Apptheme.color.green, width: '90%', alignSelf: 'center' },
            ]}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.loginButtonText}>New Registration</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SignUpForm visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Apptheme.color.background,
  },
  halfScreenGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Apptheme.color.secondaryBackground,
    width: '100%',
    padding: 20,
    borderRadius: 5,
    marginVertical: 12,
    marginTop: 18,
  },
  headerText: {
    fontFamily: FontFamily.INTER600,
    fontSize: 12.5,
    color: Apptheme.color.text,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 5,
    elevation: 3,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    width: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#dfe8f5',
    paddingTop: 0,
    paddingBottom: 2,
    backgroundColor: '#edf1f7',
  },
  logoText: {
    fontFamily: FontFamily.INTER800,
    fontSize: 20.5,
  },
  sectionTitle: {
    fontFamily: FontFamily.INTER700,
    fontSize: 18,
    marginBottom: 2,
    color: Apptheme.color.text,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontFamily: FontFamily.INTER500,
    fontSize: 12.5,
    color: Apptheme.color.subText,
    textAlign: 'center',
    marginBottom: 40,
  },

  loginButton: {
    backgroundColor: Apptheme.color.blue,
    width: '100%',
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 25,
  },
  loginButtonText: {
    fontFamily: FontFamily.INTER500,
    fontSize: 14,
    color: Apptheme.color.whiteText,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    marginBottom: 14,
  },
  divider: {
    flex: 1,
    height: 1.4,
    backgroundColor: '#CCC',
  },
  orText: {
    marginHorizontal: 10,
    fontFamily: FontFamily.INTER500,
    fontSize: 16,
    color: Apptheme.color.text,
  },
});

export default Login;
