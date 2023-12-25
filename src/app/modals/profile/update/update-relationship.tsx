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

const UpdateRelationshipStatusScreen = () => {
  const theme = useColorScheme() ?? 'dark';
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);
  const { refetch } = useServerUser(true);
  const navigation = useNavigation();
  const [updateProfileMutation, { data, error, loading }] = useMutation(
    updateProfileMutationString
  );

  const [selectedRelationshipStatus, setSelectedRelatonshipStatus] = useState(
    serverUser?.relationshipStatus?.toLowerCase() ?? ''
  );

  const [relationshipStatus, setRelationshipStatus] = useState({
    single: selectedRelationshipStatus === 'single',
    married: selectedRelationshipStatus === 'married',
    divorced: selectedRelationshipStatus === 'divorced',
    complicated: selectedRelationshipStatus === 'complicated',
  });

  useEffect(() => {
    setRelationshipStatus({
      single: selectedRelationshipStatus === 'single',
      married: selectedRelationshipStatus === 'married',
      divorced: selectedRelationshipStatus === 'divorced',
      complicated: selectedRelationshipStatus === 'complicated',
    });
  }, [selectedRelationshipStatus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (
          !loading &&
          selectedRelationshipStatus !==
            serverUser?.relationshipStatus?.toLowerCase() &&
          selectedRelationshipStatus !== ''
        ) {
          return (
            <TouchableOpacity
              disabled={loading}
              onPress={updaterelationshipStatus}
            >
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
  }, [relationshipStatus, serverUser, loading]);

  const updaterelationshipStatus = async () => {
    try {
      const res = await updateProfileMutation({
        variables: {
          relationshipStatus: selectedRelationshipStatus.toUpperCase(),
        },
      });
      ToastAndroid.show('Relationship status updated', ToastAndroid.SHORT);
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
          Single
        </Text>
        <BouncyCheckbox
          size={25}
          disableText
          fillColor={Colors[theme].primary}
          innerIconStyle={{ borderWidth: 2 }}
          disableBuiltInState
          isChecked={relationshipStatus.single}
          onPress={() => {
            setSelectedRelatonshipStatus('single');
          }}
        />
      </View>
      <View className='flex flex-row items-center justify-between'>
        <Text header className='text-lg'>
          Married
        </Text>
        <BouncyCheckbox
          size={25}
          disableText
          fillColor={Colors[theme].primary}
          innerIconStyle={{ borderWidth: 2 }}
          disableBuiltInState
          isChecked={relationshipStatus.married}
          onPress={() => {
            setSelectedRelatonshipStatus('married');
          }}
        />
      </View>

      <View className='flex flex-row items-center justify-between'>
        <Text header className='text-lg'>
          Divorced
        </Text>
        <BouncyCheckbox
          size={25}
          disableText
          fillColor={Colors[theme].primary}
          innerIconStyle={{ borderWidth: 2 }}
          disableBuiltInState
          isChecked={relationshipStatus.divorced}
          onPress={() => {
            setSelectedRelatonshipStatus('divorced');
          }}
        />
      </View>

      <View className='flex flex-row items-center justify-between'>
        <Text header className='text-lg'>
          It's complicated
        </Text>
        <BouncyCheckbox
          size={25}
          disableText
          fillColor={Colors[theme].primary}
          innerIconStyle={{ borderWidth: 2 }}
          disableBuiltInState
          isChecked={relationshipStatus.complicated}
          onPress={() => {
            setSelectedRelatonshipStatus('complicated');
          }}
        />
      </View>
    </View>
  );
};

export default UpdateRelationshipStatusScreen;
