import ActivityIndicator from '@/components/ui/ActivityIndicator';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import useServerUser from '@/hooks/useServerUser';
import { RootState } from '@/store';
import { gql } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TextInput, View, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const profileSchema = Yup.object({
  username: Yup.string().max(20, 'Max 20 character are allowed'),
  gender: Yup.mixed().oneOf(['MALE', 'FEMALE', 'OTHERS']),
});

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $username: String
    $gender: GenderEnum
    $relationshipStatus: RelationshipEnum
    $street: String
    $city: String
    $state: String
    $postalCode: String
    $country: String
  ) {
    updateProfile(
      username: $username
      gender: $gender
      relationshipStatus: $relationshipStatus
      street: $street
      city: $city
      state: $state
      postalCode: $postalCode
      country: $country
    ) {
      user {
        id
      }
    }
  }
`;

const UpdateProfileModal = () => {
  const theme = useColorScheme() ?? 'dark';
  const { user } = useUser();
  const { refetch } = useServerUser(true);
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);
  const [usernameValidation, setUsernameValidation] = useState({
    valid: true,
    checkingValidity: false,
  });

  const initialValues = {
    username:
      serverUser?.username === user?.emailAddresses[0].emailAddress
        ? ''
        : serverUser?.username,
  };

  const onSubmit = async (values: typeof initialValues) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View className='flex space-y-4 m-4'>
          <View className='flex space-y-2'>
            <View className='flex flex-row items-center justify-between'>
              <Text className='ml-2'>Username</Text>
              {!usernameValidation.checkingValidity ? (
                usernameValidation.valid ? (
                  <Ionicons
                    name='checkmark-circle-outline'
                    size={24}
                    color={'#15803d'}
                  />
                ) : (
                  <Ionicons
                    name='close-circle-outline'
                    size={24}
                    color={'#b91c1c'}
                  />
                )
              ) : (
                <ActivityIndicator />
              )}
            </View>
            <TextInput
              placeholderTextColor={Colors[theme].text}
              placeholder='Username'
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              cursorColor={Colors[theme].primary}
              className='border border-primaryLight dark:border-primaryDark rounded-md px-2 py-1 text-textLight dark:text-textDark'
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default UpdateProfileModal;
