import ActivityIndicator from '@/components/ui/ActivityIndicator';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import useServerUser from '@/hooks/useServerUser';
import { RootState } from '@/store';
import { gql, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import {
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const bioSchema = Yup.object({
  bio: Yup.string()
    .max(100, 'Bio must be 100 or less characters long')
    .required('Bio must not be empty'),
});

const UPDATE_BIO = gql`
  mutation UpdateProfile($bio: String) {
    updateProfile(bio: $bio) {
      user {
        bio
      }
    }
  }
`;

const UpdateBioModal = () => {
  const theme = useColorScheme() ?? 'dark';
  const navigation = useNavigation();

  const [updateBioMutation, { data, error, loading }] = useMutation(UPDATE_BIO);
  const { refetch } = useServerUser(true);
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);

  const multilineValue = (charLength: number) => {
    const lines = Math.ceil(charLength / 45);
    if (lines === 0) return 1;
    return lines;
  };

  const [bio, setBio] = useState(serverUser?.bio ?? '');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (
          !loading &&
          bio.trim() !== serverUser?.bio &&
          bio.trim() !== '' &&
          bio.trim().length >= 3 &&
          bio.trim().length < 101
        ) {
          return (
            <TouchableOpacity disabled={loading} onPress={onSubmit}>
              <Ionicons
                name='checkmark'
                size={24}
                color={Colors[theme].headerText}
              />
            </TouchableOpacity>
          );
        } else if (loading) {
          return <ActivityIndicator />;
        }
      },
    });
  }, [bio, serverUser, loading]);

  const onSubmit = async () => {
    try {
      await updateBioMutation({
        variables: {
          bio: bio.trim(),
        },
      });
      refetch();
      router.push('/(tabs)/profile');
      ToastAndroid.show('Bio updated', ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className='flex-1 space-y-2 m-4'>
      <View>
        <Text className='text-sm font-light'>Bio</Text>
        <TextInput
          autoFocus
          placeholderTextColor={Colors[theme].text}
          placeholder='Write your bio...'
          onChangeText={(bio) => setBio(bio)}
          value={bio}
          onBlur={() => setBio(bio.trim())}
          numberOfLines={multilineValue(bio.length ?? 0)}
          multiline
          cursorColor={Colors[theme].primary}
          className='border-b border-primaryLight dark:border-primaryDark py-2 text-textLight dark:text-textDark'
        />
      </View>
      {error ? (
        <Text className='text-sm text-red-500 dark:text-red-600'>
          {error.message}
        </Text>
      ) : null}
      <Text className='text-right'>{bio.trim().length ?? 0}/100</Text>
    </View>
  );
};

export default UpdateBioModal;
