import ActivityIndicator from '@/components/ui/ActivityIndicator';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import useServerUser from '@/hooks/useServerUser';
import { RootState } from '@/store';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const profileSchema = Yup.object({
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
  const { refetch } = useServerUser(true);
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);
  const [updateProfileMutation, { data, error, loading }] =
    useMutation(UPDATE_PROFILE);
  const [usernameData, setUsernameData] = useState({
    username:
      serverUser?.email === serverUser?.username || serverUser?.username === ''
        ? ''
        : serverUser?.username!,
    updating: false,
  });

  const initialValues = {
    gender: '',
    relationshipStatus: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };

  const onSubmit = async (values: typeof initialValues) => {};

  const updateUsername = async () => {
    try {
      setUsernameData({ ...usernameData, updating: true });
      const res = await updateProfileMutation({
        variables: { username: usernameData.username },
      });
      ToastAndroid.show('Username updated', ToastAndroid.SHORT);
      refetch();
      setUsernameData({ ...usernameData, updating: false });
    } catch (err: any) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
      setUsernameData({ ...usernameData, updating: false });
    }
  };

  return (
    <View>
      <View className='flex space-y-2 m-4'>
        <View className='flex flex-row items-center justify-between'>
          <Text className='ml-2 text-lg'>Username</Text>
          <TouchableOpacity
            onPress={updateUsername}
            disabled={
              usernameData.updating ||
              usernameData.username === serverUser?.username
            }
          >
            {usernameData.updating ? (
              <View className='flex flex-row items-center space-x-2'>
                <ActivityIndicator />
                <Text>Updating...</Text>
              </View>
            ) : usernameData.username !== serverUser?.username &&
              usernameData.username !== '' &&
              usernameData.username?.length > 3 &&
              usernameData.username.length < 21 ? (
              <Text>Update</Text>
            ) : null}
          </TouchableOpacity>
        </View>
        <TextInput
          placeholderTextColor={Colors[theme].text}
          placeholder='Username'
          onChangeText={(username) =>
            setUsernameData({ ...usernameData, username })
          }
          value={usernameData.username}
          cursorColor={Colors[theme].primary}
          className='border border-primaryLight dark:border-primaryDark rounded-md px-2 py-1 text-textLight dark:text-textDark'
        />
      </View>
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
        }) => <View className='flex space-y-4 m-4'></View>}
      </Formik>
    </View>
  );
};

export default UpdateProfileModal;
