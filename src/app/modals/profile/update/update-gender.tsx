import ActivityIndicator from '@/components/ui/ActivityIndicator';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import { updateProfileMutationString } from '@/graphql/usersGql';
import useServerUser from '@/hooks/useServerUser';
import { RootState } from '@/store';
import { useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useSelector } from 'react-redux';

const UpdateGenderScreen = () => {
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

  const [selectedGender, setSelectedGender] = useState(
    serverUser?.gender?.toLocaleLowerCase() ?? ''
  );

  const [gender, setGender] = useState({
    male: selectedGender === 'male',
    female: selectedGender === 'female',
    others: selectedGender === 'others',
  });

  useEffect(() => {
    setGender({
      male: selectedGender === 'male',
      female: selectedGender === 'female',
      others: selectedGender === 'others',
    });
  }, [selectedGender]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (
          !loading &&
          selectedGender !== serverUser?.gender?.toLocaleLowerCase() &&
          selectedGender !== ''
        ) {
          return (
            <TouchableOpacity disabled={loading} onPress={updateGender}>
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
  }, [gender, serverUser, loading]);

  const updateGender = async () => {
    try {
      const res = await updateProfileMutation({
        variables: { gender: selectedGender.toLocaleUpperCase() },
      });
      ToastAndroid.show('Gender updated', ToastAndroid.SHORT);
      refetch();
      router.back();
    } catch (err: any) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View className='flex-1 m-4 space-y-4'>
      <View className='flex flex-row items-center justify-between'>
        <Text header className='text-lg'>
          Female
        </Text>
        <BouncyCheckbox
          size={25}
          disableText
          fillColor={Colors[theme].primary}
          innerIconStyle={{ borderWidth: 2 }}
          disableBuiltInState
          isChecked={gender.female}
          onPress={() => {
            setSelectedGender('female');
          }}
        />
      </View>
      <View className='flex flex-row items-center justify-between'>
        <Text header className='text-lg'>
          Male
        </Text>
        <BouncyCheckbox
          size={25}
          disableText
          fillColor={Colors[theme].primary}
          innerIconStyle={{ borderWidth: 2 }}
          disableBuiltInState
          isChecked={gender.male}
          onPress={() => {
            setSelectedGender('male');
          }}
        />
      </View>

      <View className='flex flex-row items-center justify-between'>
        <Text header className='text-lg'>
          Others
        </Text>
        <BouncyCheckbox
          size={25}
          disableText
          fillColor={Colors[theme].primary}
          innerIconStyle={{ borderWidth: 2 }}
          disableBuiltInState
          isChecked={gender.others}
          onPress={() => {
            setSelectedGender('others');
          }}
        />
      </View>
    </View>
  );
};

export default UpdateGenderScreen;
