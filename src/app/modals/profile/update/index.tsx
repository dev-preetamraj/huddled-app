import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import {
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useSelector } from 'react-redux';

const UpdateProfileModal = () => {
  const theme = useColorScheme() ?? 'dark';

  const serverUser = useSelector((state: RootState) => state.auth.serverUser);

  return (
    <ScrollView
      className='flex-1'
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Link href='/modals/profile/update/update-username' asChild>
        <TouchableOpacity className='mx-4 mt-4'>
          <Text className='text-sm font-light'>Username</Text>
          <View className='border-b border-primaryLight dark:border-primaryDark py-2 text-textLight dark:text-textDark'>
            <Text header>
              {serverUser?.username === serverUser?.email
                ? 'Update username...'
                : serverUser?.username}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>

      <Link href='/modals/profile/update/update-gender' asChild>
        <TouchableOpacity className='mx-4 mt-4'>
          <Text className='text-sm font-light'>Gender</Text>
          <View className='border-b border-primaryLight dark:border-primaryDark py-2 text-textLight dark:text-textDark flex flex-row items-center justify-between'>
            <Text header>
              {serverUser?.gender
                ? serverUser?.gender?.charAt(0).toUpperCase() +
                  serverUser.gender.toLowerCase().slice(1)
                : 'Update gender'}
            </Text>
            <Ionicons
              name='chevron-forward'
              size={24}
              color={Colors[theme].headerText}
            />
          </View>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
};

export default UpdateProfileModal;
