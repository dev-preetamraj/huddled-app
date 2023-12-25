import LoadingScreen from '@/components/ui/LoadingScreen';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import { friendRequestsQueryString } from '@/graphql/friendshipGql';
import { useQuery } from '@apollo/client';
import { Octicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View, useColorScheme } from 'react-native';

const FriendsScreen = () => {
  const {
    data: requestsData,
    error: requestsError,
    loading: requestsLoading,
  } = useQuery<FriendRequestsQueryType>(friendRequestsQueryString);
  const theme = useColorScheme() ?? 'dark';
  return (
    <View className='flex-1'>
      <View className='m-4 flex flex-row items-center justify-start space-x-4'>
        <Link href='/modals/person/sent-requests' asChild>
          <TouchableOpacity className='h-10 w-[40%] flex items-center justify-center bg-secondaryLight dark:bg-secondaryDark rounded-full'>
            <Text header>Send requests</Text>
          </TouchableOpacity>
        </Link>
        <Link href='/modals/person/discover' asChild>
          <TouchableOpacity className='h-10 w-[40%] flex items-center justify-center bg-secondaryLight dark:bg-secondaryDark rounded-full'>
            <Text header>Discover</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className='flex-1'>
        <View className='flex flex-row items-center justify-between m-4'>
          <Text header className='text-lg'>
            Friend requests
          </Text>
          <TouchableOpacity>
            <Text className='text-primaryLight dark:text-primaryDark'>
              See all ({requestsData?.friendRequests.edges.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View className='flex-1 m-4'>
          {requestsLoading ? (
            <LoadingScreen />
          ) : (
            <FlashList
              data={requestsData?.friendRequests.edges}
              renderItem={({ item }) => (
                <View className='flex-1'>
                  <View className='flex-1 flex-row items-center space-x-2'>
                    <Link
                      href={`/modals/profile/detail/${item.node.id}`}
                      asChild
                    >
                      <TouchableOpacity>
                        <Image
                          source={{ uri: item.node.profilePicture! }}
                          className='h-24 w-24 rounded-full'
                        />
                      </TouchableOpacity>
                    </Link>
                    <View className='flex-1 space-y-2'>
                      <View className='flex flex-row items-center space-x-2'>
                        <Text header className='text-xl'>
                          {item.node.firstName + ' ' + item.node.lastName}
                        </Text>
                        {!item.node.isHuddledVerified ? (
                          <Octicons
                            name='verified'
                            size={20}
                            color={Colors[theme].primary}
                          />
                        ) : null}
                      </View>
                      <View className='flex-1 flex-row items-center justify-between'>
                        <TouchableOpacity className='flex items-center justify-center h-10 w-[48%] rounded-sm bg-primaryLight dark:bg-primaryDark'>
                          <Text header className='text-lg'>
                            Accept
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex items-center justify-center h-10 w-[48%] rounded-sm bg-secondaryLight dark:bg-secondaryDark'>
                          <Text header className='text-lg'>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              estimatedItemSize={200}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default FriendsScreen;
