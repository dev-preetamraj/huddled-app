import Colors from '@/constants/Colors';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FC } from 'react';
import { Image, TouchableOpacity, View, useColorScheme } from 'react-native';
import Text from '../ui/Text';

type Props = {
  user: Partial<BaseUser>;
};

const UserCard: FC<Props> = ({ user }) => {
  const theme = useColorScheme() ?? 'dark';
  return (
    <View className='flex flex-row items-center space-x-2 p-4'>
      <TouchableOpacity
        onPress={() => router.push(`/modals/profile/detail/${user.id}`)}
      >
        <Image
          source={{ uri: user.profilePicture! }}
          className='h-20 w-20 rounded-full'
        />
      </TouchableOpacity>
      <View className='flex-1'>
        <View className='flex flex-row items-center justify-between'>
          <View className='flex flex-row items-center space-x-2'>
            <Text className='text-lg' header>
              {user.firstName + ' ' + user.lastName}
            </Text>
            {user.isHuddledVerified ? (
              <Octicons
                name='verified'
                size={20}
                color={Colors[theme].primary}
              />
            ) : null}
          </View>
          <TouchableOpacity>
            <Ionicons
              name='person-add-outline'
              size={24}
              color={Colors[theme].headerText}
            />
          </TouchableOpacity>
        </View>
        <Text className='text-sm font-light'>
          {user.username === user.email ? '' : `@${user.username}`}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;
