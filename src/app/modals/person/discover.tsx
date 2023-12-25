import UserCard from '@/components/person/UserCard';
import UserSearchBox from '@/components/person/UserSearchBox';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Colors from '@/constants/Colors';
import { suggestedUsersQueryString } from '@/graphql/usersGql';
import { useQuery } from '@apollo/client';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useState } from 'react';
import { RefreshControl, useColorScheme, View } from 'react-native';

const DiscoverPersonScreen = () => {
  const { data, error, loading, refetch } = useQuery<SuggestedUsersQueryType>(
    suggestedUsersQueryString
  );
  const theme = useColorScheme() ?? 'dark';
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View className='flex-1'>
      <UserSearchBox />
      <FlashList
        data={data?.suggestedUsers.edges}
        renderItem={({ item }) => <UserCard user={item.node} />}
        estimatedItemSize={100}
        refreshControl={
          <RefreshControl
            colors={[Colors[theme].primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default DiscoverPersonScreen;
