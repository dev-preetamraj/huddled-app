import Text from '@/components/ui/Text';
import { RootState } from '@/store';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const UpdateProfileModal = () => {
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
    </ScrollView>
  );
};

export default UpdateProfileModal;
