/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontFamily } from '../../assets/theme/font';
import Feather from 'react-native-vector-icons/Feather';
import Apptheme from '../../assets/theme/apptheme';

const AppointmentConfirmModal = ({
  visible,
  onClose,
  selectedTime,
  dateDetails,
  onBookAndPay,
  onBookAndPayLater,
  loginUser,
}) => {
  const appointmentDetails = {
    appointmentNo: '2024122626',
    uhidNo: 'KAK/24/12/0057867898678986799',
    fees: '₹0.00',
    advance: '₹2.00',
  };

  const morningValue = parseInt(dateDetails?.morning, 10);

  const calculateAge = (dob) => {
    try {
      const [day, month, year] = dob.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();

      return age;
    } catch (error) {
      return 0;
    }
  };
  const [remark, setRemark] = useState('');

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Confirm Appointment</Text>
            <TouchableOpacity style={styles.closeButtonView} onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.patientDetails}>
              <Text style={styles.patientName}>
                {loginUser?.firstName} {loginUser?.lastName}
              </Text>
              <View style={styles.patientInfoRow}>
                <Text style={styles.infoText}>
                  {loginUser?.gender} | {calculateAge(loginUser?.dob)}Y | {loginUser?.phoneNumber} |
                </Text>
                <View
                  style={{
                    backgroundColor: '#F2A93B',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: -4,
                  }}
                >
                  <Text
                    style={[
                      styles.infoText,
                      {
                        color: Apptheme.color.whiteText,
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                      },
                    ]}
                  >
                    {morningValue + 1}
                  </Text>
                </View>

                <View style={styles.dateTimeContainer}>
                  <Feather name="calendar" size={14} color="#234C8C" />
                  <Text style={styles.dateTimeText}>{dateDetails.date}</Text>
                </View>
                <Text style={styles.timeChip}>{selectedTime}</Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.detailLabel}>Guardian Name</Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Appointment No.</Text>
                  <Text style={styles.detailValue}>{appointmentDetails.appointmentNo}</Text>
                </View>
                <View style={[styles.detailItem, { alignItems: 'flex-end' }]}>
                  <Text style={styles.detailLabel}>UHID No.</Text>
                  <Text style={styles.detailValue} numberOfLines={1}>
                    {appointmentDetails.uhidNo}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Fees</Text>
                  <Text
                    style={[styles.detailValue, { fontSize: 22, color: Apptheme.color.textLight }]}
                  >
                    {appointmentDetails.fees}
                  </Text>
                </View>
                <View style={[styles.detailItem, { alignItems: 'flex-end' }]}>
                  <Text style={styles.detailLabel}>Advance</Text>
                  <Text style={[styles.detailValue, { fontSize: 22, color: '#48A077' }]}>
                    {appointmentDetails.advance}
                  </Text>
                </View>
              </View>

              <View style={styles.remarkContainer}>
                <Text style={styles.detailLabel}>Remark</Text>
                <TextInput
                  style={styles.remarkInput}
                  placeholder=""
                  multiline={true}
                  numberOfLines={2}
                  value={remark}
                  onChangeText={setRemark}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bookLaterButton} onPress={onBookAndPayLater}>
              <Text style={styles.bookText}>Book & Pay Later</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bookPayButton}
              onPress={() => {
                const bookingData = {
                  patientName: `${loginUser?.firstName} ${loginUser?.lastName}`,
                  gender: loginUser?.gender,
                  age: calculateAge(loginUser?.dob),
                  phoneNumber: loginUser?.phoneNumber,
                  morningValue: morningValue + 1,
                  selectedDate: dateDetails?.date,
                  selectedTime: selectedTime,
                  appointmentNo: appointmentDetails.appointmentNo,
                  uhidNo: appointmentDetails.uhidNo,
                  fees: appointmentDetails.fees,
                  advance: appointmentDetails.advance,
                  remark: remark,
                };

                onBookAndPay(bookingData);
              }}
            >
              <Text style={[styles.bookText, { color: Apptheme.color.whiteText }]}>Book & Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F7F7F7',
    width: '94%',
    borderRadius: 8,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: Apptheme.color.whiteText,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  modalBody: {
    paddingHorizontal: 16,
    backgroundColor: Apptheme.color.whiteText,
    marginHorizontal: 10,
    paddingTop: 14,
    elevation: 4,
    borderRadius: 4,
    paddingBottom: 22,
  },
  modalTitle: {
    fontFamily: FontFamily.INTER700,
    fontSize: 17,
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
  patientDetails: {
    marginBottom: 20,
  },
  patientName: {
    fontFamily: FontFamily.INTER700,
    fontSize: 15.5,
    color: Apptheme.color.text,
    marginBottom: 2,
  },
  patientInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoText: {
    fontFamily: FontFamily.INTER500,
    fontSize: 12,
    color: Apptheme.color.subText,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dateTimeText: {
    fontFamily: FontFamily.INTER500,
    fontSize: 12,
    color: '#234C8C',
  },
  timeChip: {
    backgroundColor: '#234C8C',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontFamily: FontFamily.INTER500,
    fontSize: 13,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: FontFamily.INTER700,
    fontSize: 14,
    color: Apptheme.color.subText,
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: FontFamily.INTER600,
    fontSize: 16,
    color: Apptheme.color.text,
  },
  remarkContainer: {
    marginTop: 8,
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 8,
    fontFamily: FontFamily.INTER500,
    fontSize: 13,
    marginTop: 4,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
    paddingHorizontal: 16,
  },
  bookLaterButton: {
    padding: 12,
    backgroundColor: '#CCCCCC',
    borderRadius: 4,
    alignItems: 'center',
  },
  bookText: {
    fontFamily: FontFamily.INTER600,
    fontSize: 14,
    color: Apptheme.color.text,
  },
  bookPayButton: {
    padding: 12,
    backgroundColor: '#234C8C',
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default AppointmentConfirmModal;
