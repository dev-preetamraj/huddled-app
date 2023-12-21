import LoadingScreen from '@/components/ui/LoadingScreen';
import Text from '@/components/ui/Text';
import { userBydQueryString } from '@/graphql/usersGql';
import { useQuery } from '@apollo/client';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Image, View } from 'react-native';

type GetUserByIdQueryType = {
  userById: Partial<BaseUser>;
};

const UserProfileDetailScreen = () => {
  const { userId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data, error, loading } = useQuery<GetUserByIdQueryType>(
    userBydQueryString,
    {
      variables: { userId },
    }
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !loading
        ? data?.userById.firstName + ' ' + data?.userById.lastName
        : 'Please wait...',
    });
  }, [data]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View className='flex-1'>
      <View className='m-4 flex space-y-4'>
        <Image
          source={{ uri: data?.userById.profilePicture! }}
          className='h-20 w-20 rounded-full'
        />
        <Text header className='text-xl'>
          {data?.userById.firstName + ' ' + data?.userById.lastName}
        </Text>
      </View>
    </View>
  );
};

export default UserProfileDetailScreen;
