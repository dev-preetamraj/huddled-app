import LoadingScreen from '@/components/ui/LoadingScreen';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import { userBydQueryString } from '@/graphql/usersGql';
import { useQuery } from '@apollo/client';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Image, TouchableOpacity, View, useColorScheme } from 'react-native';

type GetUserByIdQueryType = {
  userById: Partial<BaseUser>;
};

const UserProfileDetailScreen = () => {
  const theme = useColorScheme() ?? 'dark';
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
        ? data?.userById.email === data?.userById.username
          ? data?.userById.firstName + ' ' + data?.userById.lastName
          : data?.userById.username
        : 'Please wait...',
    });
  }, [data]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View className='flex-1'>
      <View className='flex space-y-4 relative'>
        <Image
          className='w-full h-28 opacity-10 object-cover absolute'
          source={{ uri: data?.userById.coverPicture }}
        />
        <View className='flex flex-row items-center space-x-10 m-4'>
          <Image
            source={{ uri: data?.userById.profilePicture! }}
            className='h-20 w-20 rounded-full'
          />
          <View className='flex-1 flex flex-row items-center justify-between'>
            <TouchableOpacity className='flex items-center'>
              <Text header className='text-lg font-semibold'>
                38
              </Text>
              <Text className='text-lg'>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex items-center'>
              <Text header className='text-lg font-semibold'>
                597
              </Text>
              <Text className='text-lg'>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex items-center'>
              <Text header className='text-lg font-semibold'>
                2k
              </Text>
              <Text className='text-lg'>Likes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='mx-4 flex space-y-2'>
          <View className='flex flex-row items-center space-x-2'>
            <Text header className='text-xl'>
              {data?.userById.firstName + ' ' + data?.userById.lastName}
            </Text>
            {data?.userById.isHuddledVerified ? (
              <Octicons
                name='verified'
                size={20}
                color={Colors[theme].primary}
              />
            ) : null}
          </View>
          <Text>{data?.userById.bio}</Text>
        </View>

        <View className='flex flex-row items-center justify-between mx-4'>
          <TouchableOpacity className='h-10 w-[40%] bg-primaryLight dark:bg-primaryDark flex flex-row space-x-2 items-center justify-center rounded-sm'>
            <Ionicons
              name='person-outline'
              size={20}
              color={Colors[theme].headerText}
            />
            <Text header className='text-lg'>
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className='h-10 w-[40%] bg-secondaryLight dark:bg-secondaryDark flex flex-row space-x-2 items-center justify-center rounded-sm'>
            <Ionicons
              name='chatbox-outline'
              size={20}
              color={Colors[theme].headerText}
            />
            <Text header className='text-lg'>
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className='h-10 w-[15%] bg-secondaryLight/10 dark:bg-secondaryDark/10 flex items-center justify-center rounded-sm'>
            <Ionicons
              name='ellipsis-horizontal'
              size={24}
              color={Colors[theme].headerText}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className='flex-1 m-4'>
        <FlashList
          data={[
            { id: 1, name: 'abc' },
            { id: 4, name: 'def' },
            { id: 3, name: 'ghi' },
          ]}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default UserProfileDetailScreen;
