import LoadingScreen from '@/components/ui/LoadingScreen';
import Text from '@/components/ui/Text';
import { sentRequestsQueryString } from '@/graphql/friendshipGql';
import { useQuery } from '@apollo/client';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

const SentRequestsScreen = () => {
  const {
    data: sentRequestsData,
    error: sentRequestsError,
    loading: sentRequestsLoading,
  } = useQuery<SentRequestsQueryType>(sentRequestsQueryString);

  return (
    <View className='flex-1'>
      {sentRequestsLoading ? (
        <LoadingScreen />
      ) : (
        <FlashList
          data={sentRequestsData?.sentRequests.edges}
          renderItem={({ item }) => <Text>{item.node.email}</Text>}
          estimatedItemSize={200}
        />
      )}
    </View>
  );
};

export default SentRequestsScreen;
