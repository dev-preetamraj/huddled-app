import ActivityIndicator from '@/components/ui/ActivityIndicator';
import Colors from '@/constants/Colors';
import { updateProfileMutationString } from '@/graphql/usersGql';
import useServerUser from '@/hooks/useServerUser';
import { RootState } from '@/store';
import { useMutation } from '@apollo/client';
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

const UpdateUsernameScreen = () => {
  const theme = useColorScheme() ?? 'dark';
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);
  const { refetch } = useServerUser(true);
  const navigation = useNavigation();
  const [updateProfileMutation, { data, error, loading }] = useMutation(
    updateProfileMutationString
  );
  const [username, setUsername] = useState(
    serverUser?.username === serverUser?.email ? '' : serverUser?.username!
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (
          !loading &&
          username !== serverUser?.username &&
          username !== '' &&
          username?.length > 3 &&
          username.length < 21
        ) {
          return (
            <TouchableOpacity disabled={loading} onPress={updateUsername}>
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
  }, [username, serverUser, loading]);

  const updateUsername = async () => {
    try {
      const res = await updateProfileMutation({
        variables: { username },
      });
      ToastAndroid.show('Username updated', ToastAndroid.SHORT);
      refetch();
      router.back();
    } catch (err: any) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View className='flex-1 m-4'>
      <TextInput
        autoFocus
        placeholderTextColor={Colors[theme].text}
        placeholder='Username'
        onChangeText={(username) =>
          setUsername(username.trim().replace(/[^_\w\s]/g, ''))
        }
        value={username}
        cursorColor={Colors[theme].primary}
        className='border-b border-primaryLight dark:border-primaryDark py-2 text-textLight dark:text-textDark'
      />
    </View>
  );
};

export default UpdateUsernameScreen;
