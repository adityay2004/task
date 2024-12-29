/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Apptheme from '../../assets/theme/apptheme';
import { FontFamily } from '../../assets/theme/font';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { addAuthData } from '../../redux/reducers/slice/authSlice';

const validationSchema = Yup.object().shape({
  initial: Yup.string().required('Initial is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Invalid date format')
    .required('Date of birth is required'),
  maritalStatus: Yup.string().required('Marital status is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const SignUpForm = ({ visible, onClose }) => {
  const [isCalenderVisible, setCalenderVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const dropDowndata = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const [valueMarital, setValueMarital] = useState();
  const [isFocusMarital, setIsFocusMarital] = useState(false);

  const maritalStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
  ];
  const initialValues = {
    initial: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    maritalStatus: '',
    phoneNumber: '',
    email: '',
  };

  const handleSubmit = (values) => {
    try {
      dispatch(addAuthData(values));
      console.log(values);
      onClose();
      alert('User Add Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up</Text>
            <TouchableOpacity style={styles.closeButtonView} onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <ScrollView style={styles.formContainer}>
                <View style={styles.rowContainer}>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Initial</Text>

                    <TextInput
                      style={[styles.input, touched.initial && errors.initial && styles.errorInput]}
                      onChangeText={handleChange('initial')}
                      onBlur={handleBlur('initial')}
                      value={values.initial}
                    />
                    {/* {touched.initial && errors.initial && (
                      <Text style={styles.errorText}>{errors.initial}</Text>
                    )} */}
                  </View>
                  <View style={{ width: 10 }}></View>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.firstName && errors.firstName && styles.errorInput,
                      ]}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                    />
                  </View>
                </View>

                <View style={styles.rowContainer}>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Middle Name</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('middleName')}
                      onBlur={handleBlur('middleName')}
                      value={values.middleName}
                    />
                  </View>
                  <View style={{ width: 10 }}></View>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.lastName && errors.lastName && styles.errorInput,
                      ]}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                    />
                  </View>
                </View>

                {/* <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gender</Text>
                  <TextInput
                    style={[styles.input, touched.gender && errors.gender && styles.errorInput]}
                    onChangeText={handleChange('gender')}
                    onBlur={handleBlur('gender')}
                    value={values.gender}
                  />
                </View> */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gender</Text>
                  <Dropdown
                    style={[
                      styles.input,
                      touched.gender && errors.gender && styles.errorInput,
                      { paddingVertical: 8 },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={[styles.selectedTextStyle, { marginTop: 4 }]}
                    itemTextStyle={styles.selectedTextStyle}
                    data={dropDowndata}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Gender'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue(item);
                      setIsFocus(false);

                      if (item) {
                        handleChange('gender')(item?.value);
                        handleBlur('gender');
                      }
                    }}
                    renderRightIcon={() =>
                      isFocus ? (
                        <AntDesign name="caretup" size={10} color={Apptheme.color.textLight} />
                      ) : (
                        <AntDesign name="caretdown" size={10} color={Apptheme.color.textLight} />
                      )
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>DOB</Text>

                  <Pressable
                    onPress={() => {
                      setCalenderVisible(true);
                    }}
                    style={[
                      styles.input,
                      touched.dob && errors.dob && styles.errorInput,
                      {
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingVertical: 9,
                      },
                    ]}
                  >
                    <Text style={styles.dobText}>{values.dob}</Text>
                    {/* Display dob if available */}
                    <Icon
                      name="calendar"
                      size={18}
                      color={Apptheme.color.text}
                      style={styles.dobIcon}
                    />
                  </Pressable>

                  {isCalenderVisible && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour
                      onChange={(event, selectedDate) => {
                        setCalenderVisible(false);
                        if (selectedDate) {
                          setDate(selectedDate);
                          handleChange('dob')(selectedDate.toLocaleDateString('en-GB'));
                          handleBlur('dob');
                        }
                      }}
                    />
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Marital Status</Text>
                  {/* <TextInput
                    style={[
                      styles.input,
                      touched.maritalStatus && errors.maritalStatus && styles.errorInput,
                    ]}
                    onChangeText={handleChange('maritalStatus')}
                    onBlur={handleBlur('maritalStatus')}
                    value={values.maritalStatus}
                  /> */}

                  <Dropdown
                    style={[
                      styles.input,
                      touched.maritalStatus && errors.maritalStatus && styles.errorInput,
                      { paddingVertical: 8 },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={[styles.selectedTextStyle, { marginTop: 4 }]}
                    itemTextStyle={styles.selectedTextStyle}
                    data={maritalStatusOptions}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={''}
                    value={valueMarital}
                    onFocus={() => setIsFocusMarital(true)}
                    onBlur={() => setIsFocusMarital(false)}
                    onChange={(item) => {
                      setValueMarital(item);
                      setIsFocusMarital(false);

                      if (item) {
                        handleChange('maritalStatus')(item?.value);
                        handleBlur('maritalStatus');
                      }
                    }}
                    renderRightIcon={() =>
                      isFocusMarital ? (
                        <AntDesign name="caretup" size={10} color={Apptheme.color.textLight} />
                      ) : (
                        <AntDesign name="caretdown" size={10} color={Apptheme.color.textLight} />
                      )
                    }
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Mobile</Text>
                  <View style={styles.phoneContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          marginRight: 10,
                          backgroundColor: '#f0f0f0',
                          paddingHorizontal: 10,
                        },
                      ]}
                      value="91"
                      editable={false}
                    />
                    <TextInput
                      style={[
                        styles.input,
                        touched.phoneNumber && errors.phoneNumber && styles.errorInput,
                        { flex: 1 },
                      ]}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.input, touched.email && errors.email && styles.errorInput]}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '94%',
    maxHeight: '90%',
    padding: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontFamily: FontFamily.INTER600,
    fontSize: 18,
    color: Apptheme.color.text,
  },
  closeButtonView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    fontFamily: FontFamily.INTER500,
    fontSize: 24,
    color: Apptheme.color.text,
  },
  formContainer: {},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontFamily: FontFamily.INTER500,
    fontSize: 13,
    color: Apptheme.color.text,
  },
  input: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 14,

    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#ddd',
    borderTopColor: '#ddd',
    borderRightColor: '#ddd',
    borderBottomColor: '#ddd',
    fontSize: 13,
    color: Apptheme.color.text,
    fontFamily: FontFamily.INTER400,
  },
  errorInput: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderLeftColor: '#ddd',
    borderTopColor: '#ddd',
    borderRightColor: '#ddd',
    borderBottomColor: '#ff0000',
  },
  errorText: {
    fontFamily: FontFamily.INTER400,
    fontSize: 12,
    color: Apptheme.color.danger,
    marginTop: 5,
  },
  phoneContainer: {
    flexDirection: 'row',
  },

  submitButton: {
    backgroundColor: Apptheme.color.blue,
    width: '70%',
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: FontFamily.INTER500,
    fontSize: 14,
    color: Apptheme.color.whiteText,
  },

  placeholderStyle: {
    fontFamily: FontFamily.INTER500,
    fontSize: 13,
    color: Apptheme.color.text,

    paddingVertical: 4,
  },
  selectedTextStyle: {
    fontFamily: FontFamily.INTER500,
    fontSize: 13,
    color: Apptheme.color.text,
    paddingBottom: 2,
  },
});
